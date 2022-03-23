const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const createModels = require('./createModels')
const createCrudRouter = require('./createCrudRouter')
const fs = require('fs')

const { statusesByDate } = require('../vendor/graphic_utils')

const app = express()
app.use(bodyParser.json())

mongoose.set('useFindAndModify', false)
const conn = mongoose.createConnection('mongodb://localhost/mgt',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

createModels(conn)

app.set('mongoose', conn)

app.use('/drivers', createCrudRouter('driver', ['bus']))
app.use('/buses', createCrudRouter('bus', ['way']))
app.use('/routes', createCrudRouter('route'))
app.use('/ways', createCrudRouter('way', ['route']))

app.post('/report', async (req, res) => {
  const Bus = res.app.get('mongoose').models['bus']
  let buses = await Bus.find().populate('drivers')
  buses = buses.sort((a, b) => a.num - b.num)
    .map(bus => ({
      _id: bus._id,
      num: bus.num,
      status: bus.status,
      drivers: bus.drivers.map(driver => {
        const status = statusesByDate(driver.graphic, req.body.date, 1)[0]
        return {
          _id: driver._id,
          num: driver.num,
          name: driver.shortName,
          status: status.exception || driver.graphic.status || status.value
        }
      })
    }))

  const report = {
    rows: [],
    buses: {
      'Ремонт': [],
      'СВАРЗ': [],
      'Резерв': []
    },
    drivers: {
      'В': [],
      'Б': [],
      'О': [],
      'Резерв': []
    }
  }

  buses.forEach(bus => {
    const row = {
      bus: null,
      first: null,
      second: null,
      full: null
    }

    if (!['Ремонт', 'СВАРЗ'].includes(bus.status)) {
      row.bus = bus
    } else {
      report.buses[bus.status].push(bus)
    }

    bus.drivers.forEach(driver => {
      if (['В', 'Б', 'О'].includes(driver.status)) {
        report.drivers[driver.status].push(driver)

        if (driver.status == 'В') {
          row.weekday = driver
        }
        return
      }

      if (driver.status == '1') {
        row.first = driver
      } else if (driver.status == '2') {
        row.second = driver
      } else if (driver.status == 'Р') {
        row.full = driver
      }

      if (row.bus == null) {
        report.drivers['Резерв'].push(driver)
      }
    })
    if (row.first == row.second == row.full == null && row.bus != null) {
      report.buses['Резерв'].push(bus)
    }

    report.rows.push(row)
  })

  res.json(report)
})

app.post('/magazine', async (req, res) => {
  const Bus = res.app.get('mongoose').models['bus']
  let buses = await Bus.find().populate({ path: 'way', populate: 'route' }).populate('drivers')
  buses = buses.sort((a, b) => a.num - b.num)

  let daysInMonth = moment(req.body.month, "YYYY-MM").daysInMonth()

  const weekdays = Array.from(
    {
      length: moment(req.body.month, "YYYY-MM").daysInMonth()
    },
    (x, i) => moment(req.body.month, "YYYY-MM")
      .startOf('month')
      .add(i, 'days')
  ).filter(d => [6, 0].includes(d.day()))
    .map(d => d.format('D'))


  buses = buses.map(bus => ({
    num: bus.num,
    way: bus.way,
    drivers: bus.drivers.map(driver => ({
      num: driver.num,
      name: driver.shortName,
      firstDayRest: driver.firstDayRest,
      fullname: driver.name,
      graphic: driver.graphic,
      statuses: statusesByDate(driver.graphic, req.body.month + '-01', daysInMonth)
    }))
  }))

  const norm = +req.body.norm || 0;
  for (const bus of buses) {
    for (const driver of bus.drivers) {
      try {
        if (driver.graphic.name[1] === '2') {
          let statuses = driver.statuses;
          if (driver.firstDayRest) {
            statuses.reverse();
          }
  
          for (let i = 0; i < statuses.length - 1; i++) {
            if (statuses[i].value === 'В') {
              if (i === 0 && statuses[i + 1].value !== 'В') {
                statuses[i].value = 'В'; // О
              }
  
              if (statuses[i + 1].value === 'В') {
                statuses[i + 1].value = 'В'; // О
              }
            }
          }

          if (driver.firstDayRest) {
            statuses.reverse();
          }
        }
      } catch (e) { }

      try {
        const workStatuses = driver.statuses.filter(s => ['Р', '1', '2'].includes(s.value));
        const workMinutes = workStatuses.reduce((acc, cur) => {
          try {
            let time;
            switch (cur.value) {
              case 'Р':
                time = bus.way.times.durationFirstSmene.split(':')
                return acc + +time[1] + +time[0] * 60;
              case '1':
                time = bus.way.times.durationFirstSmene.split(':')
                return acc + +time[1] + +time[0] * 60;
              case '2':
                time = bus.way.times.durationSecondSmene.split(':')
                return acc + +time[1] + +time[0] * 60;
            }
          } catch (e) {
            return acc;
          };
          return acc;
        }, 0);
        const workHours = workMinutes / 60;

        const needRate = [
          Math.floor(norm / workStatuses.length),
          Math.floor(((norm / workStatuses.length) % 1) * 60)
        ];

        const currRate = [
          Math.floor(workHours / workStatuses.length),
          Math.floor(((workHours / workStatuses.length) % 1) * 60)
        ];

        driver.rates = {
          needRate: needRate.join(':'),
          currRate: currRate.join(':'),
          currTotal: workHours,
          over: workHours - norm,
          isCritic: ((norm + 11) - workHours) <= 0
        }
      } catch (e) {
        continue;
      }
    }
  }

  const magazine = { pages: [] }
  const busesPerPage = req.body.busesPerPage || 4

  for (
    let i = 0, pageNumber = magazine.pages.length;
    i < buses.length;
    i += busesPerPage, pageNumber++
  ) {
    magazine.pages.push({
      weekdays,
      buses: buses.slice(i, i + busesPerPage),
      number: pageNumber
    })
  }

  res.json(magazine)
})

module.exports = app

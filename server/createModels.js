const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types } = Schema

module.exports = function (conn) {
  const driverSchema = new Schema({
    num: Types.String,
    name: Types.String,
    bus: { type: Types.ObjectId, ref: 'bus' },
    phones: [Types.String],
    firstDayRest: Types.Boolean,
    graphic: {
      type: {
        name: Types.String,
        format: Types.String,
        date: Types.String,
        items: [Types.String],
        status: Types.String,
        exceptions: [{
          date: Types.String,
          value: Types.String
        }]
      },
      default: {
        name: '111',
        format: 'РВ',
        date: '2019-01-01',
        items: ['Р', 'В'],
        status: '',
        exceptions: []
      }
    }
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

  driverSchema.virtual('shortName').get(function () {
    let new_name = this.name.replace('  ', ' ')
    new_name = new_name.trim()
    let words = new_name.split(' ')
    return words[0] + ' ' + words.slice(1).map((value) => {
      return value[0] + '.'
    }).join('')
  })

  conn.model('driver', driverSchema)

  const busSchema = new Schema({
    num: Types.String,
    color: Types.String,
    status: Types.String,
    way: { type: Types.ObjectId, ref: 'way' }
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  })

  busSchema.virtual('drivers', {
    ref: 'driver',
    localField: '_id',
    foreignField: 'bus',
    justOne: false
  })

  conn.model('bus', busSchema)

  conn.model('route', new Schema({
    num: Types.String
  }))

  conn.model('way', new Schema({
    num: Types.String,
    route: { type: Types.ObjectId, ref: 'route' },
    times: {
      type: {
        durationFirstSmene: Types.String,
        durationSecondSmene: Types.String,
        outPark: Types.String,
        change: Types.String,
        endWork: Types.String,
        lunchFirstSmene: Types.String,
        lunchSecondSmene: Types.String,
      },
      default: {
        durationFirstSmene: '',
        durationSecondSmene: '',
        outPark: '',
        change: '',
        endWork: '',
        lunchFirstSmene: '',
        lunchSecondSmene: '',
      }
    }
  }))
}
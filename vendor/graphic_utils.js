const moment = require('moment')
const deepClone = require('./deepClone')

function appendItems(graphic) {
  const newGraphic = deepClone(graphic)
  newGraphic.items = newGraphic.items.concat(graphic.format.split(''))
  return newGraphic
}

function removeItems(graphic) {
  const newGraphic = deepClone(graphic)
  newGraphic.items = newGraphic.items.splice(graphic.format.length)
  return newGraphic
}

const workStatuses = ['Р', '1', '2']

function rollItem(graphic, index) {
  const newGraphic = deepClone(graphic)
  const curStatus = newGraphic.items[index]
  const nextStatus = _nextItemInArr(curStatus, workStatuses)
  newGraphic.items[index] = nextStatus
  return newGraphic
}

const allStatuses = ['Р', '1', '2', 'В', 'О', 'Б']

function rollException(graphic, status) {
  const newGraphic = deepClone(graphic)
  const curStatus = status.exception || status.value
  const nextStatus = _nextItemInArr(curStatus, allStatuses)
  if (!status.exception) {
    newGraphic.exceptions.push({
      date: status.date,
      value: nextStatus
    })
    return newGraphic
  }
  if (status.value == nextStatus) {
    newGraphic.exceptions = newGraphic.exceptions.filter(ex => ex.date != status.date)
    return newGraphic
  }
  newGraphic.exceptions = newGraphic.exceptions.map(ex => {
    if (ex.date == status.date) {
      return { date: status.date, value: nextStatus }
    }
    return ex
  })
  return newGraphic
}

function _nextItemInArr(curItem, arr) {
  const curIndex = arr.findIndex(val => val == curItem)
  const nextIndex = (curIndex + 1) % arr.length
  return arr[nextIndex]
}

function statusesByDate(graphic, date, count = 1) {
  const statuses = []
  const startDate = moment(graphic.date)
  const exceptions = graphic.exceptions
  const items = graphic.items

  let curDate = moment(date)
  for (let i = 0; i < count; i++) {
    const ex = exceptions.find(e => e.date == curDate.format('YYYY-MM-DD'))
    const diff = curDate.diff(startDate, 'days')
    const itemIndex = ((diff % items.length) + items.length) % items.length

    const status = items[itemIndex]

    statuses.push({
      date: curDate.format('YYYY-MM-DD'),
      value: status,
      exception: ex && ex.value,
      global: graphic.status
    })

    curDate = curDate.add(1, 'days')
  }

  return statuses
}

function setStatus(graphic, status) {
  const newGraphic = deepClone(graphic)
  newGraphic.status = status
  return newGraphic
}

module.exports = {
  appendItems,
  removeItems,
  rollItem,
  rollException,
  statusesByDate,
  setStatus
}
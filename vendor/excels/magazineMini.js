import Excel from 'exceljs'
import Cursor from '@/vendor/excels/Cursor'

const ROWS_PER_PAGE = 48
const COLUMNS_PER_PAGE = 41

export default async function (magazine) {
  const wb = new Excel.Workbook()
  const ws = wb.addWorksheet('Main', {
    pageSetup: {
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: magazine.pages.length,
      paperSize: 9,
      horizontalCentered: true,
      verticalCentered: true,
      orientation: 'landscape',
      margins: {
        left: 0.2, right: 0.2,
        top: 0.2, bottom: 0.2,
        header: 0, footer: 0
      }
    }
  })

  render(new Cursor(ws), magazine.pages)

  renderOverwork(new Cursor(wb.addWorksheet('List')), magazine.pages)

  return await wb.xlsx.writeBuffer()
}

function renderOverwork(cursor, pages) {
  cursor.setColumnWidth([10, 15, 33, 10, 10, 10, 15, 15]);
  cursor.getArea(1, 1, 200, 8).forEach(cell => {
    cell.font = {
      size: 16,
      bold: true
    }
  })

  cursor.getCell(1, 1).value = "Автобус";
  cursor.getCell(1, 2).value = "№ водителя";
  cursor.getCell(1, 3).value = "Ф.И.О.";
  cursor.getCell(1, 4).value = "Сейчас";
  cursor.getCell(1, 5).value = "Нужно";
  cursor.getCell(1, 7).value = "Факт";
  cursor.getCell(1, 8).value = "Переработка";

  let row = 2;
  for (const page of pages) {
    for (const bus of page.buses) {
      for (const driver of bus.drivers) {
        if (driver.rates.isCritic) {
          cursor.getCell(row, 1).value = bus.num;
          cursor.getCell(row, 2).value = driver.num;
          cursor.getCell(row, 3).value = driver.name;
          cursor.getCell(row, 4).value = driver.rates.currRate;
          cursor.getCell(row, 5).value = driver.rates.needRate;
          cursor.getCell(row, 7).value = Math.ceil(driver.rates.currTotal);
          cursor.getCell(row, 8).value = Math.ceil(driver.rates.over);
          row++;
        }
      }
    }
  }
}

function render(cursor, pages) {
  cursor.setColumnWidth([4, 4, 9, 24, 9, 7].concat(new Array(31).fill(4)).concat([9, 9, 9, 9]))

  for (let i = 0; i < pages.length; i++) {
    renderPage(cursor.createCursor(1 + ROWS_PER_PAGE * i, 1), pages[i])
  }
}

function renderPage(cursor, page) {
  cursor.setRowHeight(new Array(ROWS_PER_PAGE).fill(18.75))

  cursor.getArea(1, 1, ROWS_PER_PAGE, COLUMNS_PER_PAGE).forEach(cell => {
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
  })

  renderHeader(cursor.createCursor(6, 1), page.weekdays)
  for (let i = 0; i < 5; i++) {
    renderBus(cursor.createCursor(9 + i * 8, 1), page.buses[i])
  }
}

function renderHeader(cursor, weekdays = []) {
  cursor.setRowHeight([25, 25, 12.25])

  // merges
  new Array(
    [1, 1, 2, 1],
    [1, 2, 2, 2],
    [1, 3, 2, 3],
    [1, 4, 2, 4],
    [1, 5, 2, 5],
    [1, 6, 2, 6],
    [1, 7, 1, 37],
    [1, 38, 2, 41],
    [3, 38, 3, 41]
  ).forEach(pos => {
    cursor.mergeCells(pos[0], pos[1], pos[2], pos[3])
  })

  //font
  cursor.getArea(1, 1, 2, COLUMNS_PER_PAGE).forEach(cell => {
    cell.font = {
      size: 10,
      bold: true
    }
  })
  cursor.getArea(3, 1, 3, COLUMNS_PER_PAGE).forEach(cell => {
    cell.font = {
      size: 9
    }
  })

  //alignment
  cursor.getCell(1, 1).alignment.textRotation = 90
  cursor.getCell(1, 2).alignment.textRotation = 90
  cursor.getCell(1, 5).alignment.textRotation = 90

  //borders
  cursor.setBordersOnArea('medium', 1, 1, 3, COLUMNS_PER_PAGE)

  // content
  new Array(
    { pos: [1, 1], text: '№ маршрута' },
    { pos: [1, 2], text: '№ выхода' },
    { pos: [1, 3], text: '№ автоб.' },
    { pos: [1, 4], text: 'Фамилия' },
    { pos: [1, 5], text: 'Таб. №' },
    { pos: [1, 6], text: 'Роспись' },
    { pos: [1, 7], text: 'Календарные числа месяца' },
    { pos: [1, 38], text: 'Режим работы' },
  ).forEach(({ pos, text }) => {
    cursor.getCell(pos[0], pos[1]).value = text
  })

  new Array(31).fill(1).map((_, i) => i + 1).forEach(i => {
    cursor.getCell(2, i + 6).value = i

    if (weekdays.includes(i.toString())) {
      cursor.createCursor(2, 6 + i)
        .getArea(1, 1, 42, 1)
        .forEach(cell => {
          cell.fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FFbfbfbf'}
          }
        })
    }
  })

  new Array(38).fill(1).map((_, i) => i + 1).forEach(i => {
    cursor.getCell(3, i).value = i
  })


}

function renderBus(cursor, bus) {
  cursor.mergeCells(1, 1, 8, 1)
  cursor.mergeCells(1, 2, 8, 2)
  cursor.mergeCells(1, 3, 8, 3)

  cursor.mergeCells(1, 38, 1, 40)
  cursor.mergeCells(2, 38, 2, 40)
  cursor.mergeCells(4, 38, 4, 40)
  cursor.mergeCells(5, 38, 5, 40)
  cursor.mergeCells(6, 38, 6, 40)
  cursor.mergeCells(7, 38, 7, 40)

  //font
  cursor.getArea(1, 1, 8, COLUMNS_PER_PAGE).forEach(cell => {
    cell.font = {
      size: 12
    }
  })
  cursor.getArea(1, 38, 8, COLUMNS_PER_PAGE).forEach(cell => {
    cell.alignment.horizontal = 'left'
    cell.font = {
      size: 9,
      bold: true
    }
  })

  //alignment
  cursor.getCell(1, 1).alignment.textRotation = 90
  cursor.getCell(1, 2).alignment.textRotation = 90
  cursor.getCell(1, 3).alignment.textRotation = 90
  cursor.getArea(1, 4, 8, 4).forEach(cell => {
    cell.alignment.horizontal = 'left'
  })

  //borders
  cursor.setBordersOnArea('thin', 1, 1, 8, 37)
  new Array(COLUMNS_PER_PAGE, 37, 6, 5, 4, 3, 2, 1).forEach(c => {
    cursor.setBordersAroundArea('medium', 1, 1, 8, c)
  })

  //content
  cursor.getCell(1, 38).value = 'Выход:'
  cursor.getCell(2, 38).value = 'Продолжительность работы'
  cursor.getCell(3, 38).value = '1 смена:'
  cursor.getCell(3, 40).value = '2 смена:'
  cursor.getCell(4, 38).value = 'Выезд из парка:'
  cursor.getCell(5, 38).value = 'Время смены:'
  cursor.getCell(6, 38).value = 'Окончание работы:'
  cursor.getCell(7, 38).value = 'Время обеда'
  cursor.getCell(8, 38).value = '1 смена:'
  cursor.getCell(8, 40).value = '2 смена:'

  if (bus) {
    fillBusInfo(cursor.createCursor(), bus)
  }
}

function fillBusInfo(cursor, bus) {
  cursor.getCell(1, 1).value = bus.way && bus.way.route && bus.way.route.num
  cursor.getCell(1, 2).value = bus.way && bus.way.num
  cursor.getCell(1, 3).value = bus.num

  const positions = getDriverPositionsByCount(bus.drivers.length)

  positions.forEach((pos, i) => {
    fillDriverInfo(cursor.createCursor(pos, 4), bus.drivers[i])
  })

  if (bus.way) {
    fillWayInfo(cursor.createCursor(1, 38), bus.way)
  }
}

function fillDriverInfo(cursor, driver) {
  cursor.getCell(1, 1).value = driver.name
  cursor.getCell(1, 2).value = driver.num.slice(3)
  const graphicRow = driver.graphic && '' + driver.graphic.name
  cursor.getCell(2, 1).value = graphicRow && `(ЛВ${graphicRow}) ${graphicRow.slice(0, 1)} раб. - ${graphicRow.slice(1, 2)} вых.`

  for (let i = 0; i < driver.statuses.length; i++) {
    cursor.getCell(1, 4 + i).value = driver.statuses[i].value
  }
}

function fillWayInfo(cursor, way) {
  cursor.getCell(1, 4).value = way.num

  if (way.times) {
    cursor.getCell(3, 2).value = way.times.durationFirstSmene
    cursor.getCell(3, 4).value = way.times.durationSecondSmene
    if (!way.times.durationSecondSmene) {
      cursor.getCell(3, 3).value = '';
    }
    cursor.getCell(4, 4).value = way.times.outPark
    cursor.getCell(5, 4).value = way.times.change
    if (!way.times.change) {
      cursor.getCell(5, 3).value = '';
    }
    cursor.getCell(6, 4).value = way.times.endWork
    cursor.getCell(8, 2).value = way.times.lunchFirstSmene
    cursor.getCell(8, 4).value = way.times.lunchSecondSmene
    if (!way.times.lunchSecondSmene) {
      cursor.getCell(8, 3).value = '';
    }
  }
}

function getDriverPositionsByCount(count) {
  switch (count) {
    case 1:
      return [4]
    case 2:
      return [2, 6]
    case 3:
      return [1, 4, 7]
    case 4:
      return [1, 3, 5, 7]
    default:
      return []
  }
}
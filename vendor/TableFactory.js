import DriverForm from '@/components/DriverForm.vue'
import BusForm from '@/components/BusForm.vue'
import RouteForm from '@/components/RouteForm.vue'
import WayForm from '@/components/WayForm.vue'

export class DriversTableFactory {
  get headers () {
    return [
      { text: 'Автобус', value: 'bus.num' },
      { text: 'Номер', value: 'num' },
      { text: 'Ф.И.О.', value: 'name' }
    ]
  }

  get prefix () {
    return 'drivers'
  }

  get form () {
    return {
      title: 'Водитель',
      newFormTitle: 'Новый водитель',
      template: DriverForm
    }
  }
}

export class BusesTableFactory {
  get headers () {
    return [
      { text: 'Номер', value: 'num' },
      { text: 'Цвет', value: 'color' }
    ]
  }

  get prefix () {
    return 'buses'
  }

  get form () {
    return {
      title: 'Автобус',
      newFormTitle: 'Новый автобус',
      template: BusForm
    }
  }
}

export class RoutesTableFactory {
  get headers () {
    return [
      { text: 'Номер', value: 'num' }
    ]
  }

  get prefix () {
    return 'routes'
  }

  get form () {
    return {
      title: 'Маршрут',
      newFormTitle: 'Новый маршрут',
      template: RouteForm
    }
  }
}


export class WaysTableFactory {
  get headers () {
    return [
      { text: 'Номер', value: 'num' },
      { text: 'Маршрут', value: 'route.num' }
    ]
  }

  get prefix () {
    return 'ways'
  }

  get form () {
    return {
      title: 'Выход',
      newFormTitle: 'Новый выход',
      template: WayForm
    }
  }
}

export function getTableFactoryByPrefix (prefix) {
  switch (prefix) {
    case 'drivers':
      return new DriversTableFactory()
    case 'buses':
      return new BusesTableFactory()
    case 'routes':
      return new RoutesTableFactory()
    case 'ways':
      return new WaysTableFactory()
  }
}
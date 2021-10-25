<template lang="pug">
  v-row
    v-col
      v-subheader График
      v-select(
        label="Номер графика"
        :items="graphics"
        :value="value.name"
        @change="setGraphic"
      )
      v-select(
        label="Статус"
        :items="[{ text: 'Отпуск', value: 'О' }, { text: 'Больничный', value: 'Б' },{ text: '', value: ''}]"
        :value="value.status"
        @change="setStatus"
      )
      v-btn.mr-2.mb-2.white(
        elevation="1"
        rounded
        width="38"
        min-width="38"
        v-for="item, i in value.items"
        :key="`item_${i}`"
        :disabled="item == 'В'"
        @click="rollItem(i)"
      ) {{ item }}
      v-btn.mr-2.mb-2.white(
        elevation="1"
        rounded
        width="38"
        min-width="38"
        @click="appendItems(i)"
      ) +
      v-btn.mr-2.mb-2.white(
        elevation="1"
        rounded
        width="38"
        min-width="38"
        v-if="isExpanded"
        @click="removeItems(i)"
      ) -
      v-toolbar(flat dense)
        v-btn(fab text small @click="prevCalendarDate") {{ '<' }}
        v-spacer
        | {{ calendarTitle }}
        v-spacer
        v-btn(fab text small @click="nextCalendarDate") {{ '>' }}
      v-badge(
        :content="status.date.slice(-2)"
        offset-x="30"
        offset-y="15"
        v-for="status, i in statuses"
        :key="`status_${i}`"
      )
        v-btn.mr-4.mb-2.white(
          elevation="1"
          rounded
          width="38"
          min-width="38"
          @click="rollException(status)"
        ) {{ status.exception || status.global || status.value }}
</template>

<script>
import graphics from '@/vendor/graphics.json'
import moment from 'moment'
import {
  appendItems,
  removeItems,
  rollItem,
  rollException,
  statusesByDate,
  setStatus
} from '@/vendor/graphic_utils'

export default {
  props: {
    value: {
      default: () => ({})
    }
  },
  data() {
    return {
      graphics: graphics.map(g => ({ text: g.name })),
      calendarStartDate: moment()
    }
  },
  computed: {
    isExpanded () {
      return this.value.items && this.value.items.length > this.value.format.length
    },
    calendarTitle() {
      return this.calendarStartDate.format('YYYY-MM-DD') + ' - ' + moment(this.calendarStartDate).add(14, 'd').format('YYYY-MM-DD')
    },
    statuses() {
      return this.statusesByDate(this.value, this.calendarStartDate, 14)
    }
  },
  methods: {
    prevCalendarDate() {
      this.calendarStartDate = moment(this.calendarStartDate).subtract(14, 'd')
    },
    nextCalendarDate() {
      this.calendarStartDate = moment(this.calendarStartDate).add(14, 'd')
    },
    appendItems() {
      this.$emit('input', appendItems(this.value))
    },
    removeItems() {
      this.$emit('input', removeItems(this.value))
    },
    rollItem(index) {
      this.$emit('input', rollItem(this.value, index))
    },
    rollException(status) {
      this.$emit('input', rollException(this.value, status))
    },
    setStatus(status) {
      this.$emit('input', setStatus(this.value, status))
    },
    statusesByDate(graphic, date, count = 1) {
      return graphic.name ? statusesByDate(graphic, date, count) : []
    },
    setGraphic(graphicName) {
      const graphic = graphics.find(g => g.name == graphicName)
      this.$emit('input', {
        name: graphic.name,
        format: graphic.format,
        date: graphic.date,
        status: '',
        items: graphic.format.split(''),
        exceptions: []
      })
    }
  }
}
</script>
<template lang="pug">
  v-dialog(width="300" v-model="dialog")
    v-card
      v-card-title {{ title }}
      v-card-text
        v-text-field(label="Дата" v-model="date" v-mask="'####-##-##'")
      v-card-actions
        v-spacer
        v-btn(@click="fn") Скачать
</template>

<script>
import FileSaver from 'file-saver'
import moment from 'moment'
import { buildReport } from '@/vendor/excels'
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  data() {
    return {
      title: 'Отчет',
      dialog: true,
      date: moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    async fn () {
      const { data } = await this.$axios.post('/report', { date: this.date })
      console.log(data)
      const buf = await buildReport(data)
      await FileSaver.saveAs(new Blob([buf]), 'report.xlsx')
      this.$router.push(`/`)
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$router.push(`/`)
      }
    }
  }
}
</script>
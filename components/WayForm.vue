<template lang="pug">
  v-layout
    v-row
      v-col
        v-text-field(label="Номер" v-model="model.num")
        v-select(label="Маршрут" v-model="model.route" :items="routes")
      v-col(v-if="model.times")
        |Продолжительность работы
        v-row
          v-col.py-0
            v-text-field(label="1 смена" v-model="model.times.durationFirstSmene" v-mask="'##:##'")
          v-col.py-0
            v-text-field(label="2 смена" v-model="model.times.durationSecondSmene" v-mask="'##:##'")
        v-row
          v-col.py-0
            v-text-field(label="Выезд из парка" v-model="model.times.outPark" v-mask="'##:##'")
        v-row
          v-col.py-0
            v-text-field(label="Время смены" v-model="model.times.change" v-mask="'##:##'")
        v-row
          v-col.py-0
            v-text-field(label="Окончание работы" v-model="model.times.endWork" v-mask="'##:##'")
        |Время обеда
        v-row
          v-col.py-0
            v-text-field(label="1 смена" v-model="model.times.lunchFirstSmene" v-mask="'##:##'")
          v-col.py-0
            v-text-field(label="2 смена" v-model="model.times.lunchSecondSmene" v-mask="'##:##'")
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  props: ['model'],
  async created() {
    const { data } = await this.$axios.post('/routes/read')
    this.routes = data.map(b => ({ text: b.num, value: b._id }))
  },
  data() {
    return {
      routes: []
    }
  }
}
</script>
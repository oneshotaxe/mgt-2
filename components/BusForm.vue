<template lang="pug">
  v-layout
    v-row
      v-col
        v-text-field(label="Номер" v-model="model.num")
        v-select(label="Цвет" v-model="model.color" :items="colors")
        v-select(label="Статус" v-model="model.status" :items="statuses")
        v-autocomplete(label="Выход" v-model="model.way" :items="ways")
      v-col
</template>

<script>
export default {
  props: ['model'],
  data () {
    return {
      ways: [],
      colors: [
        'Синий',
        'Голубой',
        'Зеленый'
      ],
      statuses: [
        '',
        'Ремонт',
        'СВАРЗ',
        'Резерв'
      ]
    }
  },
  async created () {
    const { data } = await this.$axios.post('/ways/read?extend=true')
    this.ways = data.sort((a, b) => a.num - b.num)
      .sort((a, b) => a.route.num - b.route.num)
      .map(b => ({ text: b.route.num + '/' + b.num, value: b._id }))
      
  }
}
</script>
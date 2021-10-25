<template lang="pug">
  v-dialog(width="300" v-model="dialog")
    v-card
      v-card-title {{ title }}
      v-card-actions
        v-spacer
        v-btn(@click="fn") Скачать
</template>

<script>
import FileSaver from 'file-saver'

export default {
  data() {
    return {
      title: 'Скачать копию',
      dialog: true
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$router.push(`/`)
      }
    }
  },
  methods: {
    async fn () {
      const data = {}
      let response = await this.$axios.post('/buses/read')
      data.buses = response.data
      response = await this.$axios.post('/drivers/read')
      data.drivers = response.data
      response = await this.$axios.post('/routes/read')
      data.routes = response.data
      response = await this.$axios.post('/ways/read')
      data.ways = response.data
      const json = JSON.stringify(data)
      await FileSaver.saveAs(new Blob([json]), 'backup.json')
      this.$router.push(`/`)
    }
  }
}
</script>
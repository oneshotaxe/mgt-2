<template lang="pug">
  v-dialog(width="300" v-model="dialog")
    v-card
      v-card-title {{ title }}
      v-card-text
        v-file-input(label="Копия"  @change="onFileChange")
      v-card-actions
        v-spacer
        v-btn(@click="fn") Загрузить
</template>

<script>
export default {
  data() {
    return {
      title: 'Загрузить копию',
      dialog: true,
      file: null
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
    onFileChange (file) {
      this.file = file
    },
    async fn () {
      const db = JSON.parse(await this.file.text())
      await this.$axios.post('/drivers/deleteMany')
      await this.$axios.post('/buses/deleteMany')
      await this.$axios.post('/routes/deleteMany')
      await this.$axios.post('/ways/deleteMany')
      await this.$axios.post('/drivers/createMany', db.drivers)
      await this.$axios.post('/buses/createMany', db.buses)
      await this.$axios.post('/routes/createMany', db.routes)
      await this.$axios.post('/ways/createMany', db.ways)
      this.$router.push(`/`)
    }
  }
}
</script>
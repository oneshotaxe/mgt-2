<template lang="pug">
  v-dialog(v-model="dialog" fullscreen scrollable)
    v-card
      v-card-title
        |{{ title }}
        v-spacer
        v-btn(@click="back" fab small text) X
      v-card-text
        component(:is="form" :model="model")
      v-card-actions
        v-btn.red--text(@click="remove" text) Удалить
        v-spacer
        v-btn(@click="back" text) Назад
        v-btn.green--text(@click="save" text) Сохранить
</template>

<script>
import { getTableFactoryByPrefix } from '@/vendor/TableFactory.js'

export default {
  data() {
    return {
      tableFactory: getTableFactoryByPrefix(this.$route.params.prefix),
      model: {},
      dialog: true
    }
  },
  computed: {
    title () {
      return this.tableFactory.form.title
    },
    prefix () {
      return this.tableFactory.prefix
    },
    form () {
      return this.tableFactory.form.template
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$router.push(`/${this.prefix}`)
      }
    }
  },
  async mounted() {
    const { data } = await this.$axios.post(`/${this.prefix}/readById`, { _id: this.$route.params.id })
    this.model = data
  },
  methods: {
    async remove() {
      const { data } = await this.$axios.post(`/${this.prefix}/delete`, this.model)
      this.$emit('remove', data)
      this.$router.push(`/${this.prefix}`)
    },
    async save() {
      let response = await this.$axios.post(`/${this.prefix}/update`, this.model)
      response = await this.$axios.post(`/${this.prefix}/readById?extend=true`, { _id: response.data._id })
      this.$emit('update', response.data)
      this.back()
    },
    back() {
      this.$router.push(`/${this.prefix}`)
    }
  }
}
</script>
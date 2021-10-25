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
        v-spacer
        v-btn(@click="back" text) Назад
        v-btn.green--text(@click="save" text) Сохранить
</template>

<script>
import { getTableFactoryByPrefix } from '@/vendor/TableFactory.js'

export default {
  data () {
    return {
      tableFactory: getTableFactoryByPrefix(this.$route.params.prefix),
      model: {},
      dialog: true
    }
  },
  computed: {
    title () {
      return this.tableFactory.form.newFormTitle
    },
    prefix () {
      return this.tableFactory.prefix
    },
    form () {
      return this.tableFactory.form.template
    }
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.$router.push(`/${this.prefix}`)
      }
    }
  },
  methods: {
    async save () {
      let response = await this.$axios.post(`/${this.prefix}/create`, this.model)
      response = await this.$axios.post(`/${this.prefix}/readById?extend=true`, { _id: response.data._id })
      this.$emit('create', response.data)
      this.$router.push(`/${this.prefix}/profile/${response.data._id}`)
    },
    back () {
      this.$router.push(`/${this.prefix}`)
    }
  }
}
</script>
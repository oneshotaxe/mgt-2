<template lang="pug">
  v-container
    v-toolbar(flat)
      v-text-field(label="Поиск" v-model="search" hide-details)
      v-spacer
      v-btn(:to="`/`" text) Назад
      v-btn(:to="`/${prefix}/new`" text) Новый
    nuxt-child(
      @update="onUpdate"
      @create="onCreate"
      @remove="onRemove"
    )
    v-data-table(
      :search="search"
      :headers="headers"
      :items="items"
      @click:row="open"
    )
</template>

<script>
import { getTableFactoryByPrefix } from '@/vendor/TableFactory.js'

export default {
  data () {
    return {
      tableFactory: getTableFactoryByPrefix(this.$route.params.prefix),
      items: [],
      search: ''
    }
  },
  computed: {
    headers () {
      return this.tableFactory.headers
    },
    prefix () {
      return this.tableFactory.prefix
    }
  },
  async mounted () {
    const { data } = await this.$axios.post(`/${this.prefix}/read?extend=true`)
    this.items = data
  },
  methods: {
    onUpdate (model) {
      this.items = this.items.map((item) => item._id == model._id ? model : item)
    },
    onCreate (model) {
      this.items = this.items.concat(model)
    },
    onRemove (model) {
      this.items = this.items.filter(item => item._id != model._id)
    },
    open (row) {
      this.$router.push(`/${this.prefix}/profile/${row._id}`)
    }
  }
}
</script>
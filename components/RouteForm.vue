<template lang="pug">
  v-layout
    v-row
      v-col
        v-text-field(label="Номер" v-model="model.num")
      v-col
</template>

<script>
export default {
  props: ['model']
}
</script>
<template>
  <nuxt-content :document="page" />
</template>

<script>
export default {
  props: {
    query: { type: String, required: true }
  },
  async fetch () {
    this.page = await this.$content(this.query).fetch()
  },
  data: () => ({
    page: []
  })
}
</script>

<style lang="postcss" module>

</style>

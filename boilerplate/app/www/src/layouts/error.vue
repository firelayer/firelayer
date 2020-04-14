<template>
  <div>
    <h1 v-if="error.statusCode === 404">{{ pageNotFound }}</h1>
    <h1 v-else>{{ otherError }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError

    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: 'Page Not Found',
      otherError: 'An Error Occurred'
    }
  }
}
</script>

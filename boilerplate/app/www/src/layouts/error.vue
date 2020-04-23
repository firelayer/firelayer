<template>
  <div class="text-center pa-2 pt-12 pb-6">
    <v-img
      class="mb-5"
      height="200px"
      contain
      src="/images/error.svg"
    ></v-img>

    <h1 v-if="error.statusCode === 404">{{ $t('error.notfound') }}</h1>
    <h1 v-else>{{ $t('error.other') }}</h1>
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

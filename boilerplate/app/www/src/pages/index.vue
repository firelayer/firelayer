<template>
  <a href="https://github.com/firelayer/firelayer">
    <img height="200" src="https://user-images.githubusercontent.com/3942799/78354991-d7925800-75a4-11ea-9185-c558cf601e25.png" alt="Firelayer">
  </a>
</template>

<script>
export default {
  mounted() {
    this.$axios.get('/api')
  }
}
</script>

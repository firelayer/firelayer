<template>
  <v-container>
    <div>
      user profile
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: ['requiresAuth']
}
</script>

<style lang="scss" scoped>
</style>

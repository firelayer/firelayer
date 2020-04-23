<template>
  <v-container>
    <div v-if="!settings.maintenance">
      <h2>{{ $t('dashboard.logged') }}</h2>
      <pre>{{ user }}</pre>
    </div>
    <div v-else class="text-center">
      <v-img
        class="mb-5"
        height="200px"
        contain
        src="/images/maintenance.svg"
      ></v-img>

      <h1>{{ $t('dashboard.maintenance') }}</h1>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import { realtime } from '../../firebase'
import requiresAuth from '../../mixins/requiresAuth'

export default {
  mixins: [requiresAuth],
  layout: 'backoffice',
  data() {
    return {
      settings: {
        maintenance: false
      }
    }
  },
  computed: {
    ...mapState('app', ['user'])
  },
  mounted() {
    realtime().ref('/_SETTINGS').on('value', (snapshot) => {
      this.settings = snapshot.val() || this.settings
    })
  },
  beforeDestroy() {
    realtime().ref('/_SETTINGS').off()
  }
}
</script>

<style lang="scss" scoped>
</style>

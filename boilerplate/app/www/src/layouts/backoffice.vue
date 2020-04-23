<template>
  <v-app>
    <v-app-bar
      flat
      height="80"
      color="white"
      style="max-height: 80px"
    >
      <v-container class="d-flex">
        <nuxt-link :to="localePath('/')" class="d-flex align-center">
          <img src="/images/logo.png" alt="TheCompany" height="38" class="mr-2">
        </nuxt-link>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <lang-switcher class="mr-2" />
          <user-menu />
        </div>
      </v-container>
    </v-app-bar>

    <v-content>
      <client-only>
        <nuxt />
      </client-only>
    </v-content>
  </v-app>
</template>

<script>
import UserMenu from '../components/common/UserMenu'
import LangSwitcher from '../components/common/LangSwitcher'

export default {
  name: 'BackofficeLayout',
  components: {
    UserMenu,
    LangSwitcher
  }
}
</script>

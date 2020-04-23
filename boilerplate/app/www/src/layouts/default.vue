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
      <nuxt />

      <v-footer color="transparent" class="pt-5 pb-5">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <img src="/images/logo.png" height="38" alt="">
              <div class="overline">© 2020 TheCompany</div>
              <div style="margin-left: -8px">
                <v-btn small href="javascript:void(0)" icon>
                  <v-icon small>mdi-facebook</v-icon>
                </v-btn>
                <v-btn small href="javascript:void(0)" icon>
                  <v-icon small>mdi-twitter</v-icon>
                </v-btn>
                <v-btn small href="javascript:void(0)" icon>
                  <v-icon small>mdi-github</v-icon>
                </v-btn>
                <v-btn small href="javascript:void(0)" icon>
                  <v-icon small>mdi-instagram</v-icon>
                </v-btn>
                <v-btn small href="javascript:void(0)" icon>
                  <v-icon small>mdi-pinterest</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="font-weight-black mb-2">
                {{ $t('footer.title1') }}
              </div>
              <div class="d-flex flex-column subtitle-2">
                <nuxt-link :to="localePath('/about')">{{ $t('common.about') }}</nuxt-link>
                <nuxt-link :to="localePath('/contact')">{{ $t('common.contact') }}</nuxt-link>
                <nuxt-link :to="localePath('/faq')">{{ $t('common.faq') }}</nuxt-link>
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="font-weight-black mb-2">
                {{ $t('footer.title2') }}
              </div>
              <div class="d-flex flex-column subtitle-2">
                <nuxt-link :to="localePath('/terms')">{{ $t('common.tos') }}</nuxt-link>
                <nuxt-link :to="localePath('/policy')">{{ $t('common.policy') }}</nuxt-link>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
import UserMenu from '../components/common/UserMenu'
import LangSwitcher from '../components/common/LangSwitcher'

export default {
  name: 'DefaultLayout',
  components: {
    UserMenu,
    LangSwitcher
  }
}
</script>

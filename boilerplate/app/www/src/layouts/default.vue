<template>
  <v-app>
    <v-app-bar flat app height="80" hide-on-scroll>
      <v-container class="d-flex">
        <a href="/" class="d-flex align-center">
          <img src="/images/logo.png" alt="TheCompany" height="40" class="mr-2">
          <!-- <v-toolbar-title></v-toolbar-title> -->
        </a>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn href="/auth/login" text x-large>Sign In</v-btn>
        </v-toolbar-items>
      </v-container>
    </v-app-bar>

    <v-content>
      <nuxt />

      <v-footer color="transparent" class="pa-5">
        <v-container class="text-center">
          <div class="footer-links">
            <a href="#">Pricing</a>
            <a href="#">FAQ</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div class="mt-2">© 2020 TheCompany</div>
        </v-container>
      </v-footer>

    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
.footer-links {
  a {
    display: inline-block;
    margin: 10px;
  }
}
</style>

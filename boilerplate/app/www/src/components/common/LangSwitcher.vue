<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          {{ currentLanguage }}
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
          <v-list-item-title>{{ locale.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  computed: {
    currentLanguage () {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale).name
    },
    availableLocales () {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
  }
}
</script>

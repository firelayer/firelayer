<template>
  <v-container>
    <h1>{{ $t('common.faq') }}</h1>
    <v-expansion-panels class="mt-5">
      <v-expansion-panel
        v-for="(item,i) in 5"
        :key="i"
      >
        <v-expansion-panel-header class="font-weight-black">Item</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="caption mt-2 text-center">
      {{ $t('faq.call') }}
      <nuxt-link :to="localePath('/contact')">{{ $t('common.contact') }}</nuxt-link>
    </div>
  </v-container>
</template>

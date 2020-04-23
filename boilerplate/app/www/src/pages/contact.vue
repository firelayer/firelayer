<template>
  <div class="white pb-6 pt-4 text-center">
    <v-container>
      <h1 class="display-2 mb-6 text-uppercase">{{ $t('common.contact') }}</h1>
      <div class="mx-auto" style="max-width: 700px">
        <p class="body-1 font-weight-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ullam voluptatibus voluptas accusamus. Ipsa magnam ratione voluptatibus, velit praesentium reiciendis</p>
        <v-form class="mt-5">
          <v-text-field :label="$t('contact.name')" outlined></v-text-field>
          <v-text-field :label="$t('contact.email')" outlined></v-text-field>
          <v-textarea :label="$t('contact.message')" outlined></v-textarea>
          <v-btn color="success" x-large block>{{ $t('contact.button') }}</v-btn>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

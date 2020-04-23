<template>
  <v-form>
    <div class="d-flex flex-column flex-md-row justify-center align-top mx-auto" style="max-width: 600px;">
      <v-text-field
        v-model="email"
        outlined
        class="mr-md-2"
        placeholder="Email"
      ></v-text-field>
      <v-btn x-large color="primary">
        {{ $t('newsletter.button') }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'NewsletterForm',
  data() {
    return {
      email: ''
    }
  }
}
</script>

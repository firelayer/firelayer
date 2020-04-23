<template>
  <div class="ma-2 mt-8 mb-12">
    <v-card class="text-center solo-card pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{ $t('forgot.title') }}</v-card-title>
      <v-card-text>
        <div class="mb-6">
          {{ $t('forgot.subtitle') }}
        </div>
        <v-form ref="form" v-model="isFormValid" lazy-validation @submit.prevent="submit">
          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="error"
            :error-messages="errorMessages"
            :label="$t('forgot.email')"
            name="email"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            block
            x-large
            color="success"
            @click="submit"
          >{{ $t('forgot.button') }}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      <router-link :to="localePath('/auth/login')" style="text-decoration: underline">
        {{ $t('forgot.backtosign') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { auth } from '../../firebase'

export default {
  middleware: ['redirectIfAuth'],
  data() {
    return {
      // reset button
      isLoading: false,

      // form
      isFormValid: true,
      email: '',

      // form error
      error: false,
      errorMessages: '',

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
    submit(e) {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.resetEmail(this.email)
      }
    },
    async resetEmail(email, password) {
      try {
        await auth().sendPasswordResetEmail(email)
      } catch (error) {
        const { code, message } = error

        this.error = true
        this.errorMessages = message
      }

      this.isLoading = false
    },
    resetErrors() {
      this.error = false
      this.errorMessages = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.solo-card {
  max-width: 470px;
  margin: auto;
}
</style>

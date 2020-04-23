<template>
  <div class="ma-2 mt-8 mb-12">
    <v-card class="text-center solo-card pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{ $t('login.title') }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="error"
            :label="$t('login.email')"
            name="email"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="error"
            :error-messages="errorMessages"
            :label="$t('login.password')"
            name="password"
            outlined
            @change="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isSignInDisabled"
            block
            x-large
            color="success"
            @click="submit"
          >{{ $t('login.button') }}</v-btn>

          <div class="separator">{{ $t('login.orsign') }}</div>

          <v-btn
            v-for="provider in providers"
            :key="provider.id"
            :loading="provider.isLoading"
            :disabled="isSignInDisabled"
            class="mb-2"
            block
            x-large
            @click="signInProvider(provider)"
          >
            <v-icon small left>mdi-{{ provider.id }}</v-icon>
            {{ provider.label }}
          </v-btn>

          <div v-if="errorProvider" class="error--text">{{ errorProviderMessages }}</div>

          <div class="mt-5">
            <nuxt-link :to="localePath('/auth/forgot-password')">{{ $t('login.forgot') }}</nuxt-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t('login.noaccount') }}
      <nuxt-link :to="localePath('/auth/register')" style="text-decoration: underline">
        {{ $t('login.create') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { signIn, signInWithProvider } from '../../firebase/helpers/auth'

export default {
  middleware: ['redirectIfAuth'],
  data() {
    return {
      // sign in buttons
      isLoading: false,
      isSignInDisabled: false,

      // form
      isFormValid: true,
      email: '',
      password: '',

      // form error
      error: false,
      errorMessages: '',

      errorProvider: false,
      errorProviderMessages: '',

      // show password field
      showPassword: false,

      providers: [{
        id: 'google',
        label: 'Google',
        isLoading: false
      }, {
        id: 'facebook',
        label: 'Facebook',
        isLoading: false
      }, {
        id: 'apple',
        label: 'Apple',
        isLoading: false
      }, {
        id: 'twitter',
        label: 'Twitter',
        isLoading: false
      }, {
        id: 'github',
        label: 'Github',
        isLoading: false
      }, {
        id: 'microsoft',
        label: 'Microsoft',
        isLoading: false
      }, {
        id: 'yahoo',
        label: 'Yahoo',
        isLoading: false
      }],

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignInDisabled = true
        this.signIn(this.email, this.password)
      }
    },
    async signIn(email, password) {
      try {
        const result = await signIn(email, password)
        const { user } = result

        // user is authenticated
      } catch (error) {
        const { code, message } = error

        this.error = true
        this.errorMessages = this.$t('login.error')
      }

      this.isLoading = false
      this.isSignInDisabled = false
    },
    async signInProvider(provider) {
      this.resetErrors()

      provider.isLoading = true
      this.isSignInDisabled = true

      try {
        const result = await signInWithProvider(provider)
        const token = result.credential.accessToken
        const { user } = result

        // user is authenticated
      } catch (error) {
        const { code, credential, message, email } = error

        this.errorProvider = true
        this.errorProviderMessages = message
      }

      provider.isLoading = false
      this.isSignInDisabled = false
    },
    resetErrors() {
      this.error = false
      this.errorMessages = ''

      this.errorProvider = false
      this.errorProviderMessages = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.solo-card {
  max-width: 470px;
  margin: auto;
}

.separator {
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 800;
  color: #757575;
  margin: 20px 0;
}
</style>

<template>
  <div class="ma-2 mt-8 mb-12">
    <v-card class="text-center solo-card pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{ $t('register.title') }}</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errorName"
            :error-messages="errorNameMessage"
            :label="$t('register.name')"
            name="name"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="errorEmail"
            :error-messages="errorEmailMessage"
            :label="$t('register.email')"
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
            :error="errorPassword"
            :error-messages="errorPasswordMessage"
            :label="$t('register.password')"
            name="password"
            outlined
            @change="resetErrors"
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isSignUpDisabled"
            block
            x-large
            color="success"
            @click="submit"
          >{{ $t('register.button') }}</v-btn>

          <div class="separator">{{ $t('register.orsign') }}</div>

          <v-btn
            v-for="provider in providers"
            :key="provider.id"
            :loading="provider.isLoading"
            :disabled="isSignUpDisabled"
            class="mb-2"
            block
            x-large
            @click="signInProvider(provider)"
          >
            <v-icon small left>mdi-{{ provider.id }}</v-icon>
            {{ provider.label }}
          </v-btn>

          <div v-if="errorProvider" class="error--text">{{ errorProviderMessages }}</div>

          <div class="mt-5 overline">
            {{ $t('register.agree') }}
            <br />
            <nuxt-link :to="localePath('/terms')">{{ $t('common.tos') }}</nuxt-link>
            &
            <nuxt-link :to="localePath('/policy')">{{ $t('common.policy') }}</nuxt-link>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="text-center mt-6">
      {{ $t('register.account') }}
      <router-link :to="localePath('/auth/login')" style="text-decoration: underline">
        {{ $t('register.signin') }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { auth } from '../../firebase'
import { signUp, signInWithProvider } from '../../firebase/helpers/auth'

export default {
  middleware: ['redirectIfAuth'],
  data() {
    return {
      // sign up buttons
      isLoading: false,
      isSignUpDisabled: false,

      // form
      isFormValid: true,
      email: '',
      password: '',
      name: '',

      // form error
      errorName: false,
      errorEmail: false,
      errorPassword: false,
      errorNameMessage: '',
      errorEmailMessage: '',
      errorPasswordMessage: '',

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
        this.isSignUpDisabled = true
        this.signUp(this.email, this.password)
      }
    },
    async signUp(email, password) {
      try {
        await signUp(email, password)

        const user = auth().currentUser

        await user.updateProfile({
          displayName: this.name
        })

        user.sendEmailVerification()
      } catch (error) {
        const { code, message } = error

        if (code === 'auth/email-already-in-use' || code === 'auth/invalid-email') {
          this.errorEmail = true
          this.errorEmailMessage = message
        } else {
          this.errorPassword = true
          this.errorPasswordMessage = message
        }
      }

      this.isLoading = false
      this.isSignUpDisabled = false
    },
    async signInProvider(provider) {
      this.resetErrors()

      provider.isLoading = true
      this.isSignUpDisabled = true

      try {
        const result = await signInWithProvider(provider)
        const token = result.credential.accessToken
        const { user } = result

        console.log(user)

        // user is authenticated
      } catch (error) {
        const { code, credential, message, email } = error

        this.errorProvider = true
        this.errorProviderMessages = message
      }

      provider.isLoading = false
      this.isSignUpDisabled = false
    },
    resetErrors() {
      this.errorName = false
      this.errorEmail = false
      this.errorPassword = false
      this.errorNameMessage = ''
      this.errorEmailMessage = ''
      this.errorPasswordMessage = ''

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

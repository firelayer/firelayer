<template>
  <div class="ma-2 mt-8 mb-12">
    <div class="initial-card elevation-1">
      <h1 class="display-1 mb-4">Sign In</h1>
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="[rules.required]"
          :validate-on-blur="false"
          :error="error"
          name="email"
          label="Email"
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
          name="password"
          label="Password"
          outlined
          @change="resetErrors"
          @keyup.enter="submit"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn
          :loading="isLoading"
          :disabled="isGoogleLoading"
          block
          depressed
          x-large
          color="success"
          @click="submit"
        >Sign In</v-btn>

        <div class="separator">Or sign in with</div>

        <v-btn
          :loading="isGoogleLoading"
          :disabled="isLoading"
          block
          outlined
          x-large
          @click="signInGoogle"
        >
          Google
        </v-btn>
        <div class="mt-5">
          <nuxt-link :to="'/auth/forgot-password'">Forgot password?</nuxt-link>
        </div>
      </v-form>
    </div>

    <div class="text-center mt-6">
      Don't have an account?
      <nuxt-link
        :to="'/auth/register'"
        class="font-weight-bold"
        style="text-decoration: underline"
      >Create one here</nuxt-link>
    </div>
  </div>
</template>

<script>
import { auth } from '../../firebase'

export default {
  data() {
    return {
      // sign in buttons
      isLoading: false,
      isGoogleLoading: false,

      // form
      isFormValid: true,
      email: '',
      password: '',

      // form error
      error: false,
      errorMessages: '',

      // show password field
      showPassword: false,

      // input rules
      rules: {
        required: value => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.signIn(this.email, this.password)
      }
    },
    async signIn(email, password) {
      try {
        const result = await auth().signInWithEmailAndPassword(email, password)
        const { user } = result

        if (user.emailVerified) {
          this.$router.push({ name: 'dashboard' })
        } else {
          this.$router.push({ name: 'verify-email' })
        }
      } catch (error) {
        const { code, message } = error

        this.error = true
        this.errorMessages = 'The email / password combination is invalid'
      }

      this.isLoading = false
    },
    async signInGoogle() {
      this.isGoogleLoading = true

      try {
        const provider = new auth.GoogleAuthProvider()
        const result = await auth().signInWithPopup(provider)

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken
        // The signed-in user info.
        const { user } = result

        this.$router.push({
          name: 'dashboard'
        })
      } catch (error) {
        this.isGoogleLoading = false

        // Handle Errors here.// The email of the user's account used.
        const { code, message, email } = error

        // The firebase.auth.AuthCredential type that was used.
        const { credential } = error

        // this.error = true
        // this.errorMessages = message
      }
    },
    resetErrors() {
      this.error = false
      this.errorMessages = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.initial-card {
  text-align: center;
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  margin: auto;
  max-width: 470px;
  margin-top: 12px;
}

.separator {
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 800;
  color: #757575;
  margin: 10px 0;
}

.v-btn {
  img {
    height: 24px;
    margin-right: 12px;
  }
}
</style>

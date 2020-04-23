<template>
  <div class="ma-2 mt-8 mb-12">
    <v-card class="text-center solo-card pa-1">
      <v-card-title class="justify-center display-1 mb-2">{{ title }}</v-card-title>
      <v-card-text>
        <div class="overline">{{ status }}</div>
        <div class="error--text mt-2 mb-4">{{ error }}</div>

        <nuxt-link v-if="error" :to="localePath('/auth/login')">{{ $t('check.backtosign') }}</nuxt-link>

        <v-progress-circular
          v-if="isLoading"
          :size="30"
          :width="2"
          color="primary"
          indeterminate
        ></v-progress-circular>

        <div v-if="showNewPassword">
          <v-text-field
            v-model="newPassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            :error="errorNewPassword"
            :error-messages="errorNewPasswordMessage"
            :label="$t('check.newpassword')"
            name="password"
            outlined
            class="mt-4"
            @change="resetErrors"
            @keyup.enter="confirmPasswordReset"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :loading="isLoadingReset"
            block
            x-large
            color="success"
            @click="confirmPasswordReset"
          >{{ $t('check.button') }}</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { auth } from '../../firebase'

export default {
  middleware: ['redirectIfAuth'],
  data() {
    return {
      isLoading: true,
      isLoadingReset: false,

      showNewPassword: false,
      newPassword: '',
      userEmail: '',

      // form error
      errorNewPassword: false,
      errorNewPasswordMessage: '',

      // show password field
      showPassword: false,

      title: '',
      status: '',
      error: null,

      // input rules
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      },

      oobCode: null,
      continueUrl: null,
      lang: null
    }
  },
  mounted() {
    const { mode, oobCode, continueUrl, lang } = this.$route.query

    if (oobCode) this.oobCode = oobCode
    if (continueUrl) this.continueUrl = continueUrl
    if (lang) this.lang = lang

    if (!oobCode || !mode) return this.showBaseError()

    switch (mode) {
    case 'resetPassword':
      return this.handleResetPassword()
    case 'verifyEmail':
      return this.handleVerifyEmail()
    }

    return this.showBaseError()
  },
  methods: {
    showBaseError() {
      this.status = ''
      this.isLoading = false
      this.error = this.$t('check.error')
    },
    async handleResetPassword() {
      this.status = this.$t('check.verifylink')

      try {
        const email = await auth().verifyPasswordResetCode(this.oobCode)

        this.title = this.$t('check.title')
        this.userEmail = email
        this.showNewPassword = true
      } catch (error) {
        const { code, message } = error

        this.error = message
      }

      this.status = ''
      this.isLoading = false
    },
    async confirmPasswordReset() {
      this.isLoadingReset = true
      try {
        await auth().confirmPasswordReset(this.oobCode, this.newPassword)
        await auth().signInWithEmailAndPassword(this.userEmail, this.newPassword)

        this.$router.push(this.localePath('/dashboard'))
      } catch (error) {
        const { code, message } = error

        this.errorNewPassword = true
        this.errorNewPasswordMessage = message
      }

      this.isLoadingReset = false
    },
    async handleVerifyEmail() {
      this.status = this.$t('check.verifyemail')

      try {
        await auth().applyActionCode(this.oobCode)

        this.status = this.$t('check.emailverified')

        setTimeout(() => {
          this.$router.push(this.localePath('/dashboard'))
        }, 3000)
      } catch (error) {
        const { code, message } = error

        this.error = message
        this.status = ''
      }

      this.isLoading = false
    },
    resetErrors() {
      this.errorNewPassword = false
      this.errorNewPasswordMessage = ''
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

<template>
  <div>
    <v-btn
      v-if="!user"
      nuxt
      to="/auth/login"
      text
      x-large
      active-class="no-active"
    >
      Sign In
    </v-btn>

    <div v-else>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="40" color="grey lighten-2">
              <v-img v-if="user.photoURL" :src="user.photoURL" />
              <span v-else>{{ getInitials(user.displayName) }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/user">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="signOut">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '../../firebase'

export default {
  name: 'UserMenu',
  computed: {
    ...mapState('app', ['user'])
  },
  methods: {
    getInitials(name) {
      if (name) {
        const initials = name.match(/\b\w/g) || []

        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      }

      return ''
    },
    async signOut() {
      try {
        await auth().signOut()

        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>

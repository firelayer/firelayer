import { auth } from '../firebase/index'

export default ({ app, store, redirect }) => {
  auth().onAuthStateChanged((user) => {
    const { currentRoute } = app.router

    if (!store.state.app.isAuthReady) store.commit('app/SET_AUTH_READY')

    if (user) {
      store.commit('app/SET_USER', {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName
      })

      if (/^auth/.test(currentRoute.name)) {
        redirect(app.localePath('/dashboard'))
      }
    } else {
      store.commit('app/SET_USER', null)
    }
  })
}

export default {
  async asyncData({ app, store, redirect }) {
    if (process.client) {
      if (!store.state.app.isAuthReady) await waitForAuthReady(store)

      if (!store.state.app.user) {
        redirect(app.localePath('/auth/login'))
      }
    }

    return {}
  }
}

function waitForAuthReady(store) {
  return new Promise((resolve) => {
    const unwatch = store.watch(
      (state) => state.app.isAuthReady,
      (isAuthReady) => {
        resolve(isAuthReady)
        unwatch()
      }
    )
  })
}

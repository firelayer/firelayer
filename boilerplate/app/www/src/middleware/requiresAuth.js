export default async ({ store, redirect }) => {
  if (!store.state.app.isAuthReady) await waitForAuthReady(store)

  if (!store.state.app.user) {
    redirect('/auth/login')
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

export default function ({ app, store, redirect }) {
  if (store.state.app.user) {
    redirect(app.localePath('/dashboard'))
  }
}

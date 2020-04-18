export default function ({ store, redirect }) {
  if (store.state.app.user) {
    redirect('/user')
  }
}

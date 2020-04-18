import actions from './actions'
import mutations from './mutations'

const state = () => ({
  isAuthReady: false,
  user: null
})

export default {
  state,
  actions,
  mutations
}

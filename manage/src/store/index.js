import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mutations from './mutations'

const stores = new Vuex.Store({
  modules:{
	mutations
  }
})

export default stores;
import { api } from '@/request/api.js'
import { isEmpty } from '@u/tool'

const state = {
  scale: 1
}

const mutations = {
  SET_SCALE: (state, params) => {
    state.scale = params
  }
}

const actions = {
  setScale ({ commit }, content) {
    commit('SET_SCALE', content)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

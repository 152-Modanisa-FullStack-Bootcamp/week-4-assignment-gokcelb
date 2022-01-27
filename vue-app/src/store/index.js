import Vue from 'vue'
import Vuex from 'vuex'
import API from "../api"

Vue.use(Vuex)
const api = new API("https://my-json-server.typicode.com/modanisa/bootcamp-video-db")

export default new Vuex.Store({
  state: {
    videos: [],
  },
  getters: {
    getVideos(state) {
      return state.videos
    },
  },
  mutations: {
    SET_VIDEOS(state, data) {
      state.videos = data
    },
  },
  actions: {
    async loadVideos ({ commit }) {
      try {
        const data = await api.pullVideos()
        commit("SET_VIDEOS", data)
      } catch (e) {
        console.error(e)
      }
    },
  },
})

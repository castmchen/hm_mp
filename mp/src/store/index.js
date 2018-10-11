import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

const state = {
    UserInfo: {},
    Notifications: [],
    NotificationCount: 0,
    VideoList: []
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

export default store

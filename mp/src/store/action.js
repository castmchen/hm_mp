import * as constant from './constant'

export default {
    // Notification
    update_uerInfo({ commit }, userInfo) {
        commit(constant.UPDATE_USERINFO, userInfo)
    },
    add_notification({ commit }, notificationInfo) {
        commit(constant.ADD_NOTIFICATION, notificationInfo)
        commit(constant.ADD_NOTIFICATIONCOUNT, 1)
    },
    remove_notification({ commit }, id) {
        commit(constant.REMOVE_NOTIFICATION, id)
    },
    update_notification({ commit }, notificationList) {
        if (notificationList != null && typeof notificationList != 'undefined' && notificationList.length > 0) {
            commit(constant.UPDATE_NOTIFICATION, notificationList)
            commit(constant.UPDATE_NOTIFICATIONCOUNT, notificationList.length)
        }
    },
    get_notificationById({ commit }, id) {
        commit(constant.GET_NOTIFICATION, id)
    },
    get_notificationList({ commit }) {
        commit(constant.GET_NOTIFICATIONS)
    },
    add_notificationCount({ commit }, count) {
        commit(constant.ADD_NOTIFICATIONCOUNT, count)
    },
    reduce_notificationCount({ commit }, count) {
        count = count == null || typeof count !== "number" ? 1 : count
        commit(constant.REDUCE_NOTIFICATIONCOUNT, count)
    },
    update_notificationCount({ commit }, count) {
        commit(constant.UPDATE_NOTIFICATIONCOUNT, count)
    },

    // Video
    add_videoList({ commit }, videoTabInfo) {
        commit(constant.ADD_VIDEOLIST, videoTabInfo)
        return new Promise((resolve, reject) => { resolve('success') })
    },
    get_videoList({ commit }, tabValue) {
        return commit(constant.GET_VIDEOLIST, tabValue)
    }
}

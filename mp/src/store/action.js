import constant from './constant'

export default {

    //#region userInfo

    update_userInfo({ commit }, userInfo) {
        commit(constant.UPDATE_USERINFO, userInfo)
    },

    //#endregion

    //#region notifications

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

    //#endregion

    //#region videos

    add_videoList({ commit }, videoTypeObj) {
        commit(constant.ADD_VIDEOLIST, videoTypeObj)
    },
    get_videoList({ commit }, typeValue) {
        return commit(constant.GET_VIDEOLIST, typeValue)
    }

    //#endregion
}

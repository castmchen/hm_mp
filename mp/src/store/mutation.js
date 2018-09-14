import * as constant from './constant'

export default {
    [constant.UPDATE_USERINFO](state, userInfo) {
        state.UserInfo = userInfo
    },
    [constant.ADD_NOTIFICATION](state, notificationInfo) {
        state.Notifications.push(notificationInfo)
    },
    [constant.REMOVE_NOTIFICATION](state, id) {
        if (state.Notifications.length > 0) {
            let index = state.Notifications.findIndex((notification) => {
                return notification.id === id
            })
            if (index > -1) {
                state.Notifications.splice(index, 1)
                if (state.NotificationCount > 0) {
                    state.NotificationCount--
                }
            }
        }
    },
    [constant.UPDATE_NOTIFICATION](state, notificationList) {
        state.Notifications = notificationList
    },
    [constant.GET_NOTIFICATION](state, id) {
        state.Notifications.find((notification) => { return notification.id == id })
    },
    [constant.GET_NOTIFICATIONS](state) {
        return state.Notifications
    },
    [constant.ADD_NOTIFICATIONCOUNT](state, count) {
        state.NotificationCount += count
    },
    [constant.REDUCE_NOTIFICATIONCOUNT](state, count) {
        if (state.NotificationCount > 0) {
            state.NotificationCount -= count
        }
    },
    [constant.UPDATE_NOTIFICATIONCOUNT](state, count) {
        state.NotificationCount = count
    }
}

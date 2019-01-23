import * as constant from './constant'

export default {

    //#region userInfo

    [constant.UPDATE_USERINFO](state, userInfo) {
        state.UserInfo = userInfo
    },

    //#endregion

    //#region notifications

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
        return state.Notifications.find((notification) => { return notification.id == id })
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
    },

    //#endregion

    //#region videos

    [constant.GET_VIDEOLIST](state, tabValue) {
        return state.VideoList.find(function(videoInfo) { return videoInfo.tab == tabValue })
    },
    [constant.ADD_VIDEOLIST](state, videoTabInfo) {
        var existTabInfo = state.VideoList.find((videoInfo) => { return videoInfo.tab == videoTabInfo.tab })
        if (existTabInfo == null || typeof existTabInfo == 'undefined') {
            state.VideoList.push(videoTabInfo)
        } else {
            existTabInfo.count = videoTabInfo.count
            existTabInfo.videos = existTabInfo.videos.concat(videoTabInfo.videos)
            state.VideoList = state.VideoList.map(_ => {
                if (_.tab === existTabInfo.tab) {
                    return existTabInfo
                }
                return _
            })
        }
    }

    //#endregion
}

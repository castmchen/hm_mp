import constant from './constant'

export default {

    //#region userInfo

    [constant.UPDATE_USERINFO](state, userInfo) {
        state.UserInfo = userInfo
    },

    //#endregion

    //#region notifications

    [constant.ADD_NOTIFICATION](state, notificationInfo) {
        state.NotificationList.push(notificationInfo)
    },
    [constant.REMOVE_NOTIFICATION](state, id) {
        if (state.NotificationList.length > 0) {
            let index = state.NotificationList.findIndex((notification) => {
                return notification.id === id
            })
            if (index > -1) {
                state.NotificationList.splice(index, 1)
                if (state.NotificationCount > 0) {
                    state.NotificationCount--
                }
            }
        }
    },
    [constant.UPDATE_NOTIFICATION](state, notificationList) {
        state.NotificationList = notificationList
    },
    [constant.GET_NOTIFICATION](state, id) {
        return state.NotificationList.find((notification) => { return notification.id == id })
    },
    [constant.GET_NOTIFICATIONS](state) {
        return state.NotificationList
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

    [constant.GET_VIDEOLIST](state, typeValue) {
        return state.VideoList.find(videoInfo => { return videoInfo.key === typeValue })
    },
    [constant.ADD_VIDEOLIST](state, videoTypeObj) {
        let tempVideoObj = state.VideoList.find((videoInfo) => { return videoInfo.key == videoTypeObj.key })
        if (tempVideoObj == null || typeof tempVideoObj == 'undefined') {
            state.VideoList.push(videoTypeObj)
        } else {
            if (videoTypeObj.fetchNumber - tempVideoObj.fetchNumber == 1) {
                videoTypeObj.pipeType ? tempVideoObj.videos.push(...videoTypeObj.videos) : tempVideoObj.videos.unshift(videoTypeObj.videos)
                tempVideoObj.fetchNumber = tempVideoObj.fetchNumber + 1

                state.VideoList = state.VideoList.map(videoInfo => {
                    if (videoInfo.key === tempVideoObj.key) {
                        return tempVideoObj
                    } else {
                        return videoInfo
                    }
                })
            }
        }
    }

    //#endregion
}

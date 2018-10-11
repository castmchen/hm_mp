export default {
    userInfo: state => {
        return state.userInfo
    },

    // notification
    notificationList: state => {
        return state.Notifications.filter((notification) => {
            return notification.type < 3
        })
    },
    notificationCount: state => {
        return state.NotificationCount
    },

    // video
    getterVideoList: state => tabValue => {
        return state.VideoList.find((videoInfo) => { return videoInfo.tab == tabValue })
    }
}

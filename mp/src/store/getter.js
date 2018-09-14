export default {
    userInfo: state => {
        return state.userInfo
    },
    notificationList: state => {
        return state.Notifications.filter((notification) => {
            return notification.type < 3
        })
    },
    notificationCount: state => {
        return state.NotificationCount
    }
}

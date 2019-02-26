export default {
    //#region userInfo

    userInfo: state => {
        return state.UserInfo
    },

    //#endregion

    //#region notifications

    notificationList: state => {
        return state.NotificationList.filter((notification) => {
            return notification.type < 3
        })
    },
    notificationCount: state => {
        return state.NotificationCount
    },

    //#endregion

    //#region videos

    getterVideoList: state => typeValue => {
        return state.VideoList.find((videoInfo) => { return videoInfo.key === typeValue })
    }

    //#endregion
}

import NotificationModel from '../model/notificationModel'

export const notificationService = {
    getNotificationsById() {
        // TODO => 调用API获取notificationList
        let notificationsList = [{
                id: 1,
                title: "notificaiton1",
                content: "this is a test notification1.",
                isNew: false,
                type: 0
            },
            {
                id: 2,
                title: "notificaiton2",
                content: "this is a test notification2.",
                isNew: true,
                type: 0
            }
        ]

        let result = []
        for (var notificationDomain of notificationsList) {
            result.push(new NotificationModel(notificationDomain))
        }
        return result
    }
}

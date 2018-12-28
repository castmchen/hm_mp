import NotificationModel from '../model/notificationModel'

export const notificationService = {
    getNotificationsById() {
        // TODO => 调用API获取notificationList
        let notificationsDomain = [{
                Id: 1,
                Title: "notificaiton1",
                Content: "this is a test notification1.",
                Type: "0"
            },
            {
                Id: 2,
                Title: "notificaiton2",
                Content: "this is a test notification2.",
                Type: "0"
            }
        ]

        let result = []
        for (var notificationDomain of notificationsDomain) {
            result.push(new NotificationModel(notificationDomain))
        }
        return result
    }
}

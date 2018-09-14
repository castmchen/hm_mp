export default class NotificationModel {
    constructor(notificationDomain) {
        this.id = notificationDomain.Id
        this.title = notificationDomain.Title
        this.content = notificationDomain.Content
        this.type = notificationDomain.Type
    }
}

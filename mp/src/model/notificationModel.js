export default class NotificationModel {
    constructor(notificationDomain) {
        this.id = notificationDomain.id
        this.title = notificationDomain.title
        this.content = notificationDomain.content
        this.type = notificationDomain.type
        this.isNew = notificationDomain.isNew
    }
}


class NotificationQueue {

    constructor() {
        this._notifications = [];

        this._topLeftNotificationQueueDivElement = document.createElement("div");
        this._topLeftNotificationQueueDivElement.className = "notification-queue-js notification-queue-top-left-js";

        this._topRightNotificationQueueDivElement = document.createElement("div");
        this._topRightNotificationQueueDivElement.className = "notification-queue-js notification-queue-top-right-js";

        this._bottomLeftNotificationQueueDivElement = document.createElement("div");
        this._bottomLeftNotificationQueueDivElement.className = "notification-queue-js notification-queue-bottom-left-js";

        this._bottomRightNotificationQueueDivElement = document.createElement("div");
        this._bottomRightNotificationQueueDivElement.className = "notification-queue-js notification-queue-bottom-right-js";

        document.querySelector(".root").append(
            this._topLeftNotificationQueueDivElement,
            this._topRightNotificationQueueDivElement,
            this._bottomLeftNotificationQueueDivElement,
            this._bottomRightNotificationQueueDivElement
        );
    }

    get notifications() {
        return this._notifications;
    }

    get topLeftNotificationQueueDivElement() {
        return this._topLeftNotificationQueueDivElement;
    }

    get topRightNotificationQueueDivElement() {
        return this._topRightNotificationQueueDivElement;
    }

    get bottomLeftNotificationQueueDivElement() {
        return this._bottomLeftNotificationQueueDivElement;
    }

    get bottomRightNotificationQueueDivElement() {
        return this._bottomRightNotificationQueueDivElement;
    }

    addToQueue(notificationObject) {
        this._notifications.push(notificationObject);
        this.renderNotificationQueues();

        addEvent(notificationObject.domElement, "click", function () {
            notificationQueueObj.removeFromQueue(notificationObject);
            notificationObject.domElement.remove();
        });

        setTimeout(function () {
            notificationQueueObj.removeFromQueue(notificationObject);
            notificationObject.domElement.remove();
            notificationQueueObj.renderNotificationQueues();
        }, notificationObject.timeMs);
    }

    removeFromQueue(notificationObject) {
        for (let i = 0; i < this._notifications.length; i++) {
            if (this._notifications[i] === notificationObject) {
                this._notifications.splice(i, 1);
            }
        }
    }

    renderNotificationQueues() {
        let topLeftNotifications = [];
        let topRightNotifications = [];
        let bottomLeftNotifications = [];
        let bottomRightNotifications = [];

        for (let notification of this.notifications) {
            if (notification.location === NotificationLocation.NOTIFICATION_LOCATION.TOP_LEFT) {
                topLeftNotifications.push(notification);
                this.removeUnusedFromQueue(topLeftNotifications);
            } else if (notification.location === NotificationLocation.NOTIFICATION_LOCATION.TOP_RIGHT) {
                topRightNotifications.push(notification);
                this.removeUnusedFromQueue(topRightNotifications);
            } else if (notification.location === NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT) {
                bottomLeftNotifications.push(notification);
                this.removeUnusedFromQueue(bottomLeftNotifications);
            } else {
                bottomRightNotifications.push(notification);
                this.removeUnusedFromQueue(bottomRightNotifications);
            }
        }

        for (let topLeftNotification of topLeftNotifications) {
            this.topLeftNotificationQueueDivElement.append(topLeftNotification.domElement);
        }

        for (let topRightNotification of topRightNotifications) {
            this.topRightNotificationQueueDivElement.append(topRightNotification.domElement);
        }

        for (let bottomLeftNotification of bottomLeftNotifications) {
            this.bottomLeftNotificationQueueDivElement.append(bottomLeftNotification.domElement);
        }

        for (let bottomRightNotification of bottomRightNotifications) {
            this.bottomRightNotificationQueueDivElement.append(bottomRightNotification.domElement);
        }
    }

    /**
     * Remove notifications from start indexes when count of notifications more than 4.
     *
     * @param notifications
     */
    removeUnusedFromQueue(notifications) {
        if (notifications.length > 4) {
            let removedElement = notifications.shift();
            if (removedElement) {
                removedElement.domElement.remove();
            }
        }
    }
}

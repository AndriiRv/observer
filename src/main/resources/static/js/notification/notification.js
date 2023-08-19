
let notificationQueueObj;

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

        const currentNotificationQueueObj = this;

        addEvent(notificationObject.domElement, "click", function () {
            currentNotificationQueueObj.removeFromQueue(notificationObject);
            notificationObject.domElement.remove();
        });

        setTimeout(function () {
            currentNotificationQueueObj.removeFromQueue(notificationObject);
            notificationObject.domElement.remove();
            currentNotificationQueueObj.renderNotificationQueues();
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

class Notification {

    static {
        if (!notificationQueueObj) {
            notificationQueueObj = new NotificationQueue();
        }
    }

    constructor(headerText, description, location, type, timeMs) {
        this._headerText = headerText;
        this._description = description;
        this._location = location;
        this._type = type;
        this._timeMs = timeMs;
        this._domElement = null;
    }

    get headerText() {
        return this._headerText;
    }

    set headerText(value) {
        this._headerText = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = NotificationType.getType(value);
    }

    get timeMs() {
        return this._timeMs ? this._timeMs : 3000;
    }

    set timeMs(value) {
        this._timeMs = value;
    }

    get domElement() {
        return this._domElement;
    }

    set domElement(value) {
        this._domElement = value;
    }

    buildErrorNotificationOnBottomLeft() {
        this.location = NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT;
        this.type = NotificationType.NOTIFICATION_TYPE.ERROR;

        this.buildNotification();
    }

    buildErrorNotificationOnBottomRight() {
        this.location = NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT;
        this.type = NotificationType.NOTIFICATION_TYPE.ERROR;

        this.buildNotification();
    }

    buildInfoNotificationOnBottomLeft() {
        this.location = NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT;
        this.type = NotificationType.NOTIFICATION_TYPE.INFO;

        this.buildNotification();
    }

    buildInfoNotificationOnBottomRight() {
        this.location = NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT;
        this.type = NotificationType.NOTIFICATION_TYPE.INFO;

        this.buildNotification();
    }

    buildNotification() {
        let notificationElement = document.createElement("div");
        notificationElement.className = "notification-js"
        notificationElement.style.backgroundColor = this.type === NotificationType.NOTIFICATION_TYPE.INFO ? "green" : "darkred"
        notificationElement.style.color = "white";

        notificationElement.append(buildHeader(this.headerText), buildDescription(this.description));
        this.domElement = notificationElement;

        notificationQueueObj.addToQueue(this);

        function buildHeader(headerText) {
            let headerPart = document.createElement("div");
            headerPart.className = "notification-header-js";
            headerPart.textContent = headerText;
            headerPart.style.height = "20px";
            headerPart.style.width = "100px";

            let crossElement = document.createElement("span");
            crossElement.className = "cross-notification-js";
            headerPart.append(crossElement);

            return headerPart;
        }

        function buildDescription(descriptionText) {
            let descriptionPart = document.createElement("div");
            descriptionPart.className = "notification-description-js";
            descriptionPart.textContent = descriptionText;
            return descriptionPart;
        }
    }
}

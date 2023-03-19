
var notificationQueueObj = new NotificationQueue();

class Notification {

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

    buildInfoNotificationOnBottomLeft() {
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

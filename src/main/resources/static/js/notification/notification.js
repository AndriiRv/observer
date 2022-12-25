
class Notification {

    constructor(header, description, location, type, timeMs) {
        this._header = header;
        this._description = description;
        this._location = location;
        this._type = type;
        this._timeMs = timeMs;
    }

    get header() {
        return this._header;
    }

    set header(value) {
        this._header = value;
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

    buildNotification() {
        let notificationElement = document.createElement("div");
        notificationElement.style.height = "auto";
        notificationElement.style.width = "auto";
        notificationElement.style.maxWidth = "300px";
        notificationElement.style.backgroundColor = this.type === NotificationType.NOTIFICATION_TYPE.INFO ? "blue" : "darkred"
        notificationElement.style.color = "white";
        notificationElement.style.position = "absolute";
        notificationElement.style.padding = "5px";

        const notificationLocation = NotificationLocation.getLocation(this.location);
        if (notificationLocation === NotificationLocation.NOTIFICATION_LOCATION.TOP_LEFT) {
            notificationElement.style.top = "66px";
            notificationElement.style.left = "10px";
        } else if (notificationLocation === NotificationLocation.NOTIFICATION_LOCATION.TOP_RIGHT) {
            notificationElement.style.top = "66px";
            notificationElement.style.right = "10px";
        } else if (notificationLocation === NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT) {
            notificationElement.style.bottom = "10px";
            notificationElement.style.left = "10px";
        } else if (notificationLocation === NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_RIGHT) {
            notificationElement.style.bottom = "10px";
            notificationElement.style.right = "10px";
        }

        if (this.header) {
            let headerPart = document.createElement("div");
            headerPart.textContent = this.header;
            headerPart.style.height = "20px";
            headerPart.style.width = "100px";
            notificationElement.append(headerPart);
        }

        let descriptionPart = document.createElement("div");
        descriptionPart.textContent = this.description;
        notificationElement.append(descriptionPart);

        document.querySelector(".preferences").append(notificationElement);

        setTimeout(function () {
            notificationElement.remove();
        }, this.timeMs);
    }
}

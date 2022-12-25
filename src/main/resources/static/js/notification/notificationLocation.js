
class NotificationLocation {

    static NOTIFICATION_LOCATION = {
        TOP_LEFT: {value: "topLeft"},
        TOP_RIGHT: {value: "topRight"},
        BOTTOM_LEFT: {value: "bottomLeft"},
        BOTTOM_RIGHT: {value: "bottomRight"}
    };

    static getLocation(valueObj) {
        const value = valueObj.value;
        if (value === "topLeft") {
            return NotificationLocation.NOTIFICATION_LOCATION.TOP_LEFT
        } else if (value === "topRight") {
            return NotificationLocation.NOTIFICATION_LOCATION.TOP_RIGHT
        } else if (value === "bottomLeft") {
            return NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT
        } else if (value === "bottomRight") {
            return NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_RIGHT
        }
    }
}

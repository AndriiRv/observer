
class NotificationType {

    static NOTIFICATION_TYPE = {
        INFO: {value: "info"},
        ERROR: {value: "error"}
    };

    static getType(valueObj) {
        const value = valueObj.value;
        if (value === "info") {
            return NotificationType.NOTIFICATION_TYPE.INFO
        } else {
            return NotificationType.NOTIFICATION_TYPE.ERROR
        }
    }
}

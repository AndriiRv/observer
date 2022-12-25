document.addEventListener('DOMContentLoaded', function () {

    addEvent(document.querySelector(".save-new-resource-js"), "click", function () {
        let nameNewResource = document.querySelector(".name-new-resource-js").value;
        let pathNewResource = document.querySelector(".path-new-resource-js").value;

        if (!isValidate(nameNewResource, pathNewResource)) {
            return;
        }

        let body = JSON.stringify({
            name: nameNewResource,
            path: pathNewResource
        });

        postAjaxRequestWithBody(indexPreferencesPage + "resources", body, () => reload(), function (error) {
            const notification = new Notification(
                "Error",
                error,
                NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT,
                NotificationType.NOTIFICATION_TYPE.ERROR
            );
            notification.buildNotification();
        });
    });

    function isValidate(nameNewResource, pathNewResource) {
        if (!nameNewResource && !pathNewResource) {
            const notification = new Notification(
                "Error",
                "Name and path of resource are not valid. Please try again.",
                NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT,
                NotificationType.NOTIFICATION_TYPE.ERROR
            );
            notification.buildNotification();
            return false;
        }

        if (!nameNewResource) {
            const notification = new Notification(
                "Error",
                "Name of resource is not valid. Please try again.",
                NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT,
                NotificationType.NOTIFICATION_TYPE.ERROR
            );
            notification.buildNotification();
            return false;
        }

        if (!pathNewResource) {
            const notification = new Notification(
                "Error",
                "Path of resource is not valid. Please try again.",
                NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT,
                NotificationType.NOTIFICATION_TYPE.ERROR
            );
            notification.buildNotification();
            return false;
        }

        return true;
    }
});

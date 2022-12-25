document.addEventListener('DOMContentLoaded', function () {
    let initialIndex;

    let resources = document.querySelectorAll(".resource-id-js");
    for (let i = 0; i < resources.length; i++) {
        let resourceId = resources[i];
        addSwapEvent(resourceId);
    }

    function addSwapEvent(resourceId) {
        addEvent(resourceId, "mousedown", function () {
            initialIndex = resourceId.textContent;
        });

        addEvent(resourceId, "mousemove", function (event) {
        });

        addEvent(resourceId, "mouseup", function (event) {
            swap(event.target.textContent);
        });
    }

    function swap(newIndex) {
        let url = indexPreferencesPage + "resources/swap" + "?selectedResourceId=" + initialIndex + "&newSelectedIndex=" + newIndex;
        putAjaxRequest(url, reload, function (error) {
            const notification = new Notification(
                "Error",
                error,
                NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT,
                NotificationType.NOTIFICATION_TYPE.ERROR
            );
            notification.buildNotification();
        });
    }
});
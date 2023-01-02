
let initialIndex;
function addSwapEvent(resourceId) {
    addEvent(resourceId, "mousedown", function () {
        initialIndex = resourceId.textContent;
    });

    addEvent(resourceId, "mousemove", function (event) {
    });

    addEvent(resourceId, "mouseup", function (event) {
        swap(initialIndex, event.target.textContent);
    });

    function swap(initialIndex, newIndex) {
        let url = new URL(indexPreferencesPage + "resources/swap");
        url.searchParams.set("selectedResourceId", initialIndex);
        url.searchParams.set("newSelectedIndex", newIndex);

        putAjaxRequest(url.toString(), reload, function (error) {
            const notification = new Notification(
                "Error",
                error,
                NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT,
                NotificationType.NOTIFICATION_TYPE.ERROR
            );
            notification.buildNotification();
        });
    }
}

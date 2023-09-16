
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem("old-user")) {
        return;
    }

    initPlaceholderToNewUsers();

    localStorage.setItem("old-user", "true");
});

function initPlaceholderToNewUsers() {
    const observerDynamicFilterObj = new ObserverDynamicFilter();
    observerDynamicFilterObj.enabled = "true";

    setDefaultValue(observerDynamicFilterObj.enabled, "observer.dynamic.placeholder.enabled");
    setDefaultValue(observerDynamicFilterObj.initTimeout, "observer.init.timeout.placeholder");
    setDefaultValue(observerDynamicFilterObj.nextLoopTimeout, "observer.next.loop.timeout.placeholder");
    setDefaultValue(observerDynamicFilterObj.waitingTimeout, "observer.waiting.timeout.placeholder");
    setDefaultValue(observerDynamicFilterObj.writingTimeout, "observer.writing.timeout.placeholder");

    function setDefaultValue(value, localStorageKey) {
        localStorage.setItem(localStorageKey, value);
    }

    setTimeout(function () {
        new Notification(
            "Hello newbie!",
            "You can manage of dynamic placeholder for yourself near of search filter.",
            NotificationLocation.NOTIFICATION_LOCATION.TOP_RIGHT,
            NotificationType.NOTIFICATION_TYPE.INFO,
            7000
        ).buildNotification();
    }, Number(observerDynamicFilterObj.initTimeout + "000"));
}

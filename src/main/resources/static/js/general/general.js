
let notificationQueueObj;
document.addEventListener('DOMContentLoaded', function () {
    notificationQueueObj = new NotificationQueue();
});

window.addEventListener('beforeunload', function () {
    changeLogo();
});

function changeLogo() {
    document.querySelector(".logo2").style.display = "initial";
    document.querySelector(".logo").style.display = "none";
}

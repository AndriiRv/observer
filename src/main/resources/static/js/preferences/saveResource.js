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
            const notification = new Notification("Error", error);
            notification.buildErrorNotificationOnBottomLeft();
        });
    });

    function isValidate(nameNewResource, pathNewResource) {
        if (!nameNewResource && !pathNewResource) {
            const notification = new Notification("Error", "Name and path of resource are not valid. Please try again.");
            notification.buildErrorNotificationOnBottomLeft();
            return false;
        }

        if (!nameNewResource) {
            const notification = new Notification("Error", "Name of resource is not valid. Please try again.");
            notification.buildErrorNotificationOnBottomLeft();
            return false;
        }

        if (!pathNewResource) {
            const notification = new Notification("Error", "Path of resource is not valid. Please try again.");
            notification.buildErrorNotificationOnBottomLeft();
            return false;
        }

        return true;
    }
});

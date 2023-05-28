
function initSaveResource(newNameInput, newPathInput, saveElementButton, endpoint) {
    addEvent(saveElementButton, "click", function () {
        let newNameStr = newNameInput.value;
        let newPathStr = newPathInput.value;

        if (!isValidate(newNameStr, newPathStr)) {
            return;
        }

        let body = JSON.stringify({
            name: newNameStr,
            path: newPathStr
        });

        postAjaxRequestWithBody(endpoint, body, () => reload(), function (error) {
            const notification = new Notification("Error", error);
            notification.buildErrorNotificationOnBottomLeft();
        });
    });

    function isValidate(nameNewResource, pathNewResource) {
        if (!nameNewResource && !pathNewResource) {
            const notification = new Notification("Error", "Name and path are not valid. Please try again.");
            notification.buildErrorNotificationOnBottomLeft();
            return false;
        }

        if (!nameNewResource) {
            const notification = new Notification("Error", "Name is not valid. Please try again.");
            notification.buildErrorNotificationOnBottomLeft();
            return false;
        }

        if (!pathNewResource) {
            const notification = new Notification("Error", "Path is not valid. Please try again.");
            notification.buildErrorNotificationOnBottomLeft();
            return false;
        }

        return true;
    }
}

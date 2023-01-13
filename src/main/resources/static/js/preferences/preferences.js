let indexPreferencesPage = getCurrentBrowserUrl() + "preferences/";

document.addEventListener('DOMContentLoaded', function () {
    let previousResourceName;

    buildResources().then(r => {
        let resources = document.querySelectorAll(".resource-js");
        for (let i = 0; i < resources.length; i++) {
            let resource = resources[i];

            addRenameEventToResource(resource, "resource-name-js");
            addRenameEventToResource(resource, "resource-path-js");
            addClickEventToRemoveButton(resource);

            addSwapEvent(resource);
        }
    });

    function addRenameEventToResource(resource, className) {
        let resourcePart = resource.querySelector("." + className);
        addEvent(resourcePart, "click", function () {
            renameResource(resourcePart, className);
        });

        addEvent(resourcePart, "focusout", function () {
            submitRenameResource(resourcePart, className);
        });
    }

    function renameResource(resourcePart, className) {
        let renameInputElement = document.querySelector("." + className + " input");
        previousResourceName = resourcePart.textContent ? resourcePart.textContent : renameInputElement ? renameInputElement.value : "";

        if (!renameInputElement) {
            renameInputElement = document.createElement("input");

            if (resourcePart.textContent) {
                renameInputElement.value = resourcePart.textContent;
            }

            resourcePart.textContent = "";
            resourcePart.append(renameInputElement);
            renameInputElement.focus();
        }
    }

    function submitRenameResource(resourcePart, className) {
        let renameInputElement = document.querySelector("." + className + " input");

        if (previousResourceName === renameInputElement.value) {
            renameResourcePartToInputtedText(resourcePart, renameInputElement);
            return;
        }

        renameResourcePartToInputtedText(resourcePart, renameInputElement);

        submit();

        function renameResourcePartToInputtedText(resourcePart, renameInputElement) {
            resourcePart.textContent = renameInputElement.value;
            renameInputElement.remove();
        }

        function submit() {
            let idElement = resourcePart.parentElement.querySelector(".resource-id-js").textContent;
            let name = resourcePart.parentElement.querySelector(".resource-name-js").textContent;
            let path = resourcePart.parentElement.querySelector(".resource-path-js").textContent;

            let body = JSON.stringify({id: idElement, name: name, path: path});

            function successCallback() {
                const notification = new Notification(
                    "Success",
                    idElement + ". - " + name + " [" + path + "] updated.",
                    NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT,
                    NotificationType.NOTIFICATION_TYPE.INFO,
                    5000
                );
                notification.buildNotification();
            }

            putAjaxRequestWithBody(indexPreferencesPage + "resources", body, successCallback, function (error) {
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

    /**
     * Add click event to Remove button on each resource record.
     *
     * @param resource 'resource-js' element.
     */
    function addClickEventToRemoveButton(resource) {
        let removeButton = resource.querySelector(".resource-remove-js");
        addEvent(removeButton, "click", function () {
            removeResource(resource);
        });
    }

    /**
     * Remove resource by resource id
     *
     * @param resource resource.
     */
    function removeResource(resource) {
        let resourceId = resource.querySelector(".resource-id-js").textContent;
        let resourceName = resource.querySelector(".resource-name-js").textContent;

        if (confirm('Are you sure you want to remove resource "' + resourceId + ". " + resourceName + '" ?')) {
            fetch(indexPreferencesPage + "resources/" + resourceId, {
                method: "DELETE",
            }).then(response => response.json())
                .then(() => {
                    document.location.href = indexPreferencesPage;
                });
        }
    }
});

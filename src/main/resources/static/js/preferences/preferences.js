let indexPreferencesPage = getCurrentBrowserUrl();

document.addEventListener('DOMContentLoaded', function () {
    let previousResourceName;

    buildResources().then(r => {
        let resources = document.querySelectorAll(".resource-js");
        for (let i = 0; i < resources.length; i++) {
            let resource = resources[i];

            addRenameEventToResource(resource, "resource-name-js");
            addRenameEventToResource(resource, "resource-path-js");
            addClickEventToRemoveButton(resource);

            let resourceIdElement = resource.querySelector(".resource-id-js");
            addSwapEvent(resourceIdElement);
        }
    });

    function addRenameEventToResource(resource, className) {
        let resourcePart = resource.querySelector("." + className);
        addEvent(resourcePart, "click", function () {
            renameResource(resourcePart, className);
        });

        addEvent(resourcePart, "focusout", function () {
            submitRenameResource(resource, resourcePart, className);
        });
    }

    function renameResource(resourcePart, className) {
        previousResourceName = resourcePart.textContent;
        let renameInputElement = document.querySelector("." + className + " input");

        if (!renameInputElement) {
            renameInputElement = document.createElement("input");

            if (resourcePart.textContent) {
                renameInputElement.value = resourcePart.textContent;
            } else {
                if (resourcePart.childNodes[0]) {
                    renameInputElement.value = resourcePart.childNodes[0].value;
                } else {
                    renameInputElement.value = "";
                }
            }

            resourcePart.textContent = "";
            resourcePart.append(renameInputElement);
            renameInputElement.focus();
        }
    }

    function submitRenameResource(resourceElement, resourcePart, className) {
        let renameInputElement = document.querySelector("." + className + " input");

        if (previousResourceName === renameInputElement.value) {
            submitInputtedText(resourcePart, renameInputElement);
            return;
        }

        submitInputtedText(resourcePart, renameInputElement);

        let idElement = resourceElement.firstElementChild.textContent;
        let body = JSON.stringify({
            id: idElement,
            name: resourcePart.parentElement.querySelector(".resource-name-js").textContent,
            path: resourcePart.parentElement.querySelector(".resource-path-js").textContent
        });

        putAjaxRequestWithBody(indexPreferencesPage + "resources", body, null, function (error) {
            const notification = new Notification(
                "Error",
                error,
                NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_LEFT,
                NotificationType.NOTIFICATION_TYPE.ERROR
            );
            notification.buildNotification();
        });

        function submitInputtedText(resourcePart, renameInputElement) {
            resourcePart.textContent = renameInputElement.value;
            renameInputElement.remove();
        }
    }

    /**
     * Add click event to Remove button on each resource record.
     *
     * @param resource 'resource-js' element.
     * @param resourceId resource id from 'resource-id-js'.
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

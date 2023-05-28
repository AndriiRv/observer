
function addRenameEventToResource(tdElement, endpoint, isPathElement) {
    addEvent(tdElement, "click", function () {
        renameResource(tdElement);
    });

    addEvent(tdElement, "focusout", function () {
        submitRenameResource(tdElement, endpoint, isPathElement);
    });
    addEvent(tdElement, "keyup", function (event) {
        if (event.key === "Enter") {
            tdElement.querySelector("input").blur();
        }
    });
}

function renameResource(tdElement) {
    let renameInputElement = tdElement.querySelector("input");
    if (renameInputElement) {
        return;
    }

    renameInputElement = document.createElement("input");
    if (tdElement.textContent) {
        renameInputElement.value = tdElement.textContent;
    }

    tdElement.textContent = "";
    tdElement.append(renameInputElement);
    renameInputElement.focus();
}

function submitRenameResource(tdElement, endpoint, isPathElement) {
    let renameInputElement = tdElement.querySelector("input");

    if (isPathElement) {
        tdElement.append(buildAnchor(renameInputElement.value));
    } else {
        tdElement.textContent = renameInputElement.value;
    }
    renameInputElement.remove();

    submit(tdElement, endpoint);

    function submit(tdElement, endpoint) {
        let idElement = tdElement.parentElement.querySelector(".id-js").textContent;
        let name = tdElement.parentElement.querySelector(".name-js").textContent;
        let path = tdElement.parentElement.querySelector(".path-js").textContent;

        let body = JSON.stringify({id: idElement, name: name, path: path});

        function successCallback() {
            const notification = new Notification("Success", idElement + ". - " + name + " [" + path + "] updated.");
            notification.timeMs = 5000;
            notification.buildInfoNotificationOnBottomLeft();
        }

        putAjaxRequestWithBody(endpoint, body, successCallback, function (error) {
            const notification = new Notification("Error", error);
            notification.buildErrorNotificationOnBottomLeft();
        });
    }
}

/**
 * Add click event to Remove button on each resource record.
 *
 * @param removeTd 'resource-js' element.
 */
function addClickEventToRemoveButton(idTd, nameTd, removeButton, endpoint, preferenceIndexPageUrl) {
    addEvent(removeButton, "click", function () {
        removeResource(idTd, nameTd, endpoint, preferenceIndexPageUrl);
    });

    /**
     * Remove resource by resource id
     *
     * @param removeTd resource.
     */
    function removeResource(idTd, nameTd, endpoint, preferenceIndexPageUrl) {
        let elementId = idTd.textContent;
        let elementName = nameTd.textContent;

        if (confirm('Are you sure you want to remove resource "' + elementId + ". " + elementName + '" ?')) {
            fetch(endpoint + "/" + elementId, {
                method: "DELETE",
            }).then(response => response.json())
                .then(() => {
                    document.location.href = preferenceIndexPageUrl;
                });
        }
    }
}

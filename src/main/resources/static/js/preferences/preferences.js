let indexPreferencesPage = getCurrentBrowserUrl();

document.addEventListener('DOMContentLoaded', function () {
    let previousResourceName;

    let resources = document.querySelectorAll(".resource-js");
    for (let i = 0; i < resources.length; i++) {
        let resource = resources[i];
        let resourceId = resource.children[0].textContent;

        addRenameEventToResource(resource, "resource-name-js");
        addRenameEventToResource(resource, "resource-path-js");
        addClickEventToRemoveButton(resource, resourceId);
    }

    function addRenameEventToResource(resource, className) {
        let resourcePart = Array.from(resource.childNodes).filter(x => x.classList == className)[0];
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
        let body = className === "resource-name-js"
            ? JSON.stringify({id: idElement, name: resourcePart.textContent})
            : JSON.stringify({id: idElement, path: resourcePart.textContent});

        putAjaxRequestWithBody(indexPreferencesPage + "resources", body);

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
    function addClickEventToRemoveButton(resource, resourceId) {
        let partOfResourceRecords = resource.childNodes;
        for (let i = 0; i < partOfResourceRecords.length; i++) {
            if (partOfResourceRecords[i].className === "resource-remove-js") {
                let removeButton = resource.childNodes[i].childNodes[1];
                addEvent(removeButton, "click", function () {
                    removeResource(resourceId);
                });
                break;
            }
        }
    }

    /**
     * Remove resource by resource id
     *
     * @param id resource id.
     */
    function removeResource(id) {
        if (confirm('Are you sure you want to remove resource "' + id + '" ?')) {
            fetch(indexPreferencesPage + "resources/" + id, {
                method: "DELETE",
            }).then(response => response.json())
                .then(() => {
                    document.location.href = indexPreferencesPage;
                });
        }
    }
});

let indexPreferencesPage = getCurrentBrowserUrl();

document.addEventListener('DOMContentLoaded', function () {
    let previousResourceName;

    let resources = document.querySelectorAll(".resource-js");
    for (let i = 0; i < resources.length; i++) {
        let resource = resources[i];
        let resourceId = resource.children[0].textContent;

        addRenameEventToResourceName(resource);
        addClickEventToRemoveButton(resource, resourceId);
    }

    function addRenameEventToResourceName(resource) {
        let resourceNameElement = Array.from(resource.childNodes).filter(x => x.classList == "resource-name-js")[0];
        addEvent(resourceNameElement, "click", function () {
            renameResource(resourceNameElement);
        });

        addEvent(resourceNameElement, "focusout", function () {
            submitRenameResource(resourceNameElement);
        });
    }

    function renameResource(resourceNameElement) {
        previousResourceName = resourceNameElement.textContent;
        let renameInputElement = document.querySelector(".resource-name-js input");

        if (!renameInputElement) {
            renameInputElement = document.createElement("input");

            if (resourceNameElement.textContent) {
                renameInputElement.value = resourceNameElement.textContent;
            } else {
                if (resourceNameElement.childNodes[0]) {
                    renameInputElement.value = resourceNameElement.childNodes[0].value;
                } else {
                    renameInputElement.value = "";
                }
            }

            resourceNameElement.textContent = "";
            resourceNameElement.append(renameInputElement);
            renameInputElement.focus();
        }
    }

    function submitRenameResource(resourceNameElement) {
        let renameInputElement = document.querySelector(".resource-name-js input");

        if (previousResourceName === renameInputElement.value) {
            submitInputtedText(resourceNameElement, renameInputElement);
            return;
        }

        submitInputtedText(resourceNameElement, renameInputElement);

        let idElement = resourceNameElement.previousElementSibling.textContent;
        let urlElement = resourceNameElement.nextElementSibling.childNodes[0].href;

        let body = JSON.stringify({id: idElement, name: resourceNameElement.textContent, path: urlElement});

        putAjaxRequestWithBody(indexPreferencesPage + "resources", body);

        function submitInputtedText(resourceNameElement, renameInputElement) {
            resourceNameElement.textContent = renameInputElement.value;
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

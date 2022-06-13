let indexPreferencesPage = getCurrentBrowserUrl();

document.addEventListener('DOMContentLoaded', function () {
    let resources = document.querySelectorAll(".resource-js");
    for (let i = 0; i < resources.length; i++) {
        let resource = resources[i];
        let resourceId = resource.children[0].textContent;

        addClickEventToRemoveButton(resource, resourceId);
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
            if (partOfResourceRecords[i].className) {
                if (partOfResourceRecords[i].className === "resource-remove-js") {
                    addEvent(resource.childNodes[i], "click", function () {
                        removeResource(resourceId);
                    });
                    break;
                }
            }
        }
    }

    /**
     * Remove resource by resource id
     *
     * @param id resource id.
     */
    function removeResource(id) {
        if (confirm('Are you sure you want to remove resource ' + id + " ?")) {
            fetch(indexPreferencesPage + "resources/" + id, {
                method: "DELETE",
            })
            document.location.href = indexPreferencesPage;
        }
    }
});
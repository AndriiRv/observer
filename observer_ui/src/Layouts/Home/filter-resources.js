/**
 *
 * @param filterInputElement
 * @param resources
 */
export function filterResources(filterInputElement, resources) {
    if (!filterInputElement || !resources) {
        return;
    }

    let inputtedValue = filterInputElement.value;

    showAllResources();

    for (let resource of resources) {
        if (resource._nameResource && !resource._nameResource.toLowerCase().includes(inputtedValue)) {
            hideResource(resource._id);
        }
    }
}

function showAllResources() {
    let resourceDivisions = document.querySelectorAll(".resource-element");
    for (const resourceDivision of resourceDivisions) {
        resourceDivision.style.display = "flex";
    }
}

function hideResource(resourceId) {
    let resource = document.querySelector(".resource" + resourceId);
    resource.style.display = "none";
}

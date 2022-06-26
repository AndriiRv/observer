document.addEventListener('DOMContentLoaded', function () {

    let filterInputElement = document.querySelector(".filter-resources-js");

    addEvent(filterInputElement, "input", function () {
        filterResources();
    });

    function filterResources() {
        let inputtedValue = filterInputElement.value;

        showAllResources();

        if (inputtedValue.length >= 2) {
            for (let resource of resources) {
                if (!resource.name.toLowerCase().includes(inputtedValue)) {
                    hideResource(resource.id);
                }
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
        let resourceIdInputElements = document.querySelectorAll(".resourceId");

        for (const idInput of resourceIdInputElements) {
            if (Number(idInput.value) === resourceId) {
                idInput.parentElement.style.display = "none";
                break;
            }
        }
    }

});

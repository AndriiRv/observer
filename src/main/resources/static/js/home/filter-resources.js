
function filterObserverElements(filterInputElement) {
    addEvent(filterInputElement, "input", function () {
        filterResources(filterInputElement.value);
    });

    function filterResources(enteredValue) {
        let elements = filterInputElement.closest("table").querySelectorAll(".observer-element-row");
        showAllResources(elements);

        for (let element of elements) {
            const observerElementName = element.querySelector(".observer-element-name").textContent;
            if (!observerElementName.toLowerCase().includes(enteredValue.toLowerCase())) {
                element.style.display = "none";
            }
        }
    }

    function showAllResources(elements) {
        for (const element of elements) {
            element.style.display = "revert";
        }
    }
}

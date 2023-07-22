
function filterObserverElements(filterInputElement) {
    addEvent(filterInputElement, "input", function () {
        filterElements(filterInputElement, ".observer-element-name", filterInputElement.value);
    });
}

/**
 *
 *
 * @param {HTMLSelectElement} filterStatusSelect
 */
function initFilterStatuses(filterStatusSelect) {
    addEvent(filterStatusSelect, "change", function () {
        filterElements(
            filterStatusSelect,
            ".observer-element-status",
            filterStatusSelect.options[filterStatusSelect.selectedIndex].value
        );
    });
}

function filterElements(elementSelector, elementSearchableSelector, value) {
    let elements = elementSelector.closest("table").querySelectorAll(".observer-element-row");
    showAllElements(elements);

    for (let element of elements) {
        const observerElementName = element.querySelector(elementSearchableSelector).textContent;
        if (!observerElementName.toLowerCase().includes(value.toLowerCase())) {
            element.style.display = "none";
        }
    }

    function showAllElements(elements) {
        for (const element of elements) {
            element.style.display = "revert";
        }
    }
}

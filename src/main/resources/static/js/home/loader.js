
/**
 * Add 'loader' class to passed element.
 * @param element
 */
function addLoader(element) {
    if (element.classList.contains("loader")) {
        return;
    }
    element.classList.add("loader");
}

/**
 * Remove loader class from element.
 * @param element
 */
function removeLoader(element) {
    if (!element.classList.contains("loader")) {
        return;
    }
    element.classList.remove("loader");
}

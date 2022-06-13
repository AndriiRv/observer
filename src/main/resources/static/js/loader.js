
/**
 * Add div with 'loader' class name to specific element.
 *
 * @param element
 */
function buildLoader(element) {
    let loaderElement = document.createElement("div");
    loaderElement.className = "loader";

    element.append(loaderElement);
}

/**
 * Remove loader element by element.
 * In selected element can be a multiple child nodes so we loop each and compare class name with 'loader'.
 * If match then remove this loader element.
 *
 * @param element
 */
function removeLoader(element) {
    for (let childNode of element.childNodes) {
        if (childNode.className === "loader") {
            childNode.remove();
        }
    }
}


/**
 * Add 'loader' class to passed element.
 * @param element
 */
export function addLoader(element) {
    let classNames = element._className.split(" ");
    if (classNames.includes("loader")) {
        return;
    }
    classNames.push("loader");
    element._className = classNames.join(" ");
}

/**
 * Remove loader class from element.
 * @param element
 */
export function removeLoader(element) {
    let classNames = element._className.split(" ");
    if (!classNames.includes("loader")) {
        return;
    }
    classNames.remove("loader");
    element._className = classNames.join(" ");
}

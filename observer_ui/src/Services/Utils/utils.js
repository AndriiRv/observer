export function addEvent(element, event, func) {
    if (element) {
        element.addEventListener(event, func, false);
    }
}

export function openNewFocusedBrowserTab(url, target = "_blank") {
    window.open(url, target).focus();
}

/**
 * Add slash '/' character explicitly to current browser url.
 *
 * @return {string}
 */
export function getCurrentBrowserUrl() {
    let href = document.location.href;
    if (href.slice(-1) !== "/") {
        href += "/";
    }
    return href;
}

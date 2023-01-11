function addEvent(element, event, func) {
    if (element.attachEvent) {
        element.attachEvent('on' + event, func);
    } else {
        element.addEventListener(event, func, false);
    }
}

function openNewFocusedBrowserTab(url, target = "_blank") {
    window.open(url, target).focus();
}

/**
 * Add slash '/' character explicitly to current browser url.
 *
 * @return {string}
 */
function getCurrentBrowserUrl() {
    let href = document.location.origin + document.querySelector("meta[name=context-path]").content;
    if (href.slice(-1) !== "/") {
        href += "/";
    }
    return href;
}

function reload() {
    window.location.reload();
}

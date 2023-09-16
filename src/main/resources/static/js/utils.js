function addEvent(element, event, func) {
    if (element.attachEvent) {
        element.attachEvent('on' + event, func);
    } else {
        element.addEventListener(event, func, false);
    }
}

function addEventToElements(elements, event, func) {
    if (elements.length < 2) {
        new Error("Use another 'addEvent' function for one element");
    }

    for (const element of elements) {
        if (element.attachEvent) {
            element.attachEvent('on' + event, func);
        } else {
            element.addEventListener(event, func, false);
        }
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

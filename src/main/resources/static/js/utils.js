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

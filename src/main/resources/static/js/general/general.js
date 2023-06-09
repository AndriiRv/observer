
window.addEventListener('beforeunload', function () {
    loadingPageLogo();
    observerResourceWebSocket.disconnect();
    observerNetworksWebSocket.disconnect();
});

window.addEventListener("pageshow", function (event) {
    let historyTraversal = event.persisted ||
        (window.performance && window.performance.getEntriesByType('navigation').map(nav => nav.type).includes('back_forward'));
    if (historyTraversal) {
        finishedPageLoad();
    }
});

function loadingPageLogo() {
    document.querySelector(".logo").style.display = "none";
    document.querySelector(".logo2").style.display = "initial";
}

function finishedPageLoad() {
    document.querySelector(".logo").style.display = "initial";
    document.querySelector(".logo2").style.display = "none";
}

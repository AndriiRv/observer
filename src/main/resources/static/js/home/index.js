
const observerResourceWebSocket = new ObserverWebSocket('/observer/observer-resources-status', '/observer-app/resources-status', '/resources-simple-broker/status');
const observerNetworksWebSocket = new ObserverWebSocket('/observer/observer-networks-status', '/observer-app/networks-status', '/networks-simple-broker/status');

document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector("body");

    let resourceDiv = buildDiv("observer-table-div resources");
    resourceDiv.append(buildResourceTable(body));

    let networkDiv = buildDiv("observer-table-div networks");
    networkDiv.append(buildNetworkTable(body));

    document.querySelector(".root").append(resourceDiv, networkDiv);

    function buildResourceTable(bodyElement) {
        const observerElementName = "Resource";
        const fetchAllElementsUrl = bodyElement.getAttribute("data-resource-url");
        const fetchElementByIdUrl = bodyElement.getAttribute("data-resource-url");

        observerResourceWebSocket.initConnect(updateStatus);

        return buildTable(observerElementName, fetchAllElementsUrl, fetchElementByIdUrl, true, observerResourceWebSocket);
    }

    function buildNetworkTable(bodyElement) {
        const observerElementName = "Network";
        const fetchAllElementsUrl = bodyElement.getAttribute("data-network-check-url");
        const fetchElementByIdUrl = bodyElement.getAttribute("data-network-check-url");

        observerNetworksWebSocket.initConnect(updateStatus);

        return buildTable(observerElementName, fetchAllElementsUrl, fetchElementByIdUrl, false, observerNetworksWebSocket);
    }
});

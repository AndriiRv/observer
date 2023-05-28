
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

        return buildTable(observerElementName, fetchAllElementsUrl, fetchElementByIdUrl, true);
    }

    function buildNetworkTable(bodyElement) {
        const observerElementName = "Network";
        const fetchAllElementsUrl = bodyElement.getAttribute("data-network-check-url");
        const fetchElementByIdUrl = bodyElement.getAttribute("data-network-check-url");

        return buildTable(observerElementName, fetchAllElementsUrl, fetchElementByIdUrl, false);
    }
});

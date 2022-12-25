
var resources = new Set();

document.addEventListener('DOMContentLoaded', function () {

    let rootDiv = document.querySelector(".root");

    initResources();

    function initResources() {
        let response = getCountOfResources();
        response.then(response => {
            if (!response.data) {
                rootDiv.append(buildErrorMessage(response.message));
            } else {
                let countOfResources = response.data;
                for (let i = 0; i < countOfResources; i++) {
                    let childDiv = document.createElement("div");

                    childDiv.style.height = countOfResources <= 3 ? "calc(100vh - 56px)" : "calc(50vh - 2px)";

                    childDiv.className = "resource-element gray";

                    rootDiv.append(childDiv);
                    addLoader(childDiv);

                    buildResource(childDiv, i);
                }
            }
        });
    }

    function getCountOfResources() {
        return fetch(getCurrentBrowserUrl() + "resources/count")
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }

    async function buildResource(childDiv, i) {
        await fetch(getCurrentBrowserUrl() + "resources/" + ++i)
            .then(response => {
                response.json().then(function (json) {
                    let resource = json.data;

                    addEvent(childDiv, "click", function () {
                        getResource(resource.id, childDiv)
                    });

                    childDiv.append(buildHiddenInputWithResourceId(resource.id));

                    let resourceStatus = resource.status.toLowerCase();
                    childDiv.className = "resource-element " + (resourceStatus === undefined || resourceStatus == null ? "gray" : resourceStatus);

                    childDiv.append(
                        buildInfoResource(resource),
                        buildStatus(resource)
                    );

                    resources.add(resource);

                    removeLoader(childDiv);
                });
            });
    }

    function buildHiddenInputWithResourceId(resourceId) {
        let hiddenInput = document.createElement("input");
        hiddenInput.className = "resourceId";
        hiddenInput.value = resourceId;
        hiddenInput.hidden = true;
        return hiddenInput;
    }

    function buildInfoResource(resource) {
        let infoResourceElement = document.createElement("div");
        infoResourceElement.className = "info-resource";

        let spanElement = buildSpanWithClassAndText("info-resource-title", resource.name);
        let anchorElement = buildUrlAnchor(resource.path);

        infoResourceElement.append(spanElement, anchorElement);
        return infoResourceElement;
    }

    function buildStatus(resource) {
        let statusResourceElement = document.createElement("div");
        statusResourceElement.className = "status-resource";

        let spanElement = buildSpanWithClassAndText("status-resource-title", buildStatusTitle(resource.status));

        statusResourceElement.append(spanElement);
        return statusResourceElement;
    }

    function buildStatusTitle(resourceStatus) {
        let statusTitle;
        if (resourceStatus.toLowerCase() === "green") {
            statusTitle = "[active]";
        } else if (resourceStatus.toLowerCase() === "red") {
            statusTitle = "[inactive]";
        } else {
            statusTitle = "[issues are exists]";
        }
        return statusTitle;
    }

    function buildSpanWithClassAndText(className, innerText) {
        let spanElement = document.createElement("span");
        spanElement.className = className;
        spanElement.innerText = innerText;
        return spanElement;
    }

    function buildUrlAnchor(resourcePath) {
        let anchorElement = document.createElement("a");
        anchorElement.href = resourcePath;
        anchorElement.text = resourcePath;
        anchorElement.target = "_blank";
        return anchorElement;
    }

    function buildErrorMessage(message) {
        let messageElement = document.createElement("span");
        messageElement.className = "message";
        messageElement.innerText = message;
        return messageElement;
    }

    function getResource(id, childDiv) {
        addLoader(childDiv);
        childDiv.querySelector(".status-resource span").textContent = "[loading...]";

        fetch(getCurrentBrowserUrl() + "resources/" + id)
            .then(response => {
                response.json().then(function (json) {
                    let resources = document.querySelectorAll(".resource-element");
                    for (const resource of resources) {
                        if (Number(resource.childNodes[0].value) === id) {
                            resource.className = "resource-element " + json.data.status.toLowerCase();
                            resource.querySelector(".status-resource span").textContent = buildStatusTitle(json.data.status.toLowerCase());
                            removeLoader(childDiv);
                            break;
                        }
                    }
                });
            });
    }
});
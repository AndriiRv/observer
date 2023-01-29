
var resources = [];

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

                    resource.lastUpdateDateTime = luxon.DateTime.now().toISO();

                    childDiv.append(
                        buildInfoResource(resource),
                        buildStatus(resource)
                    );

                    resources.push(resource);

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

        let spanElement = buildSpanWithClassAndText("last-update-time-resource", calculateLastUpdateTime(resource.lastUpdateDateTime));
        let spanElement2 = buildSpanWithClassAndText("status-resource-title", buildStatusTitle(resource.status));

        statusResourceElement.append(spanElement, spanElement2);
        return statusResourceElement;
    }

    setInterval(function () {
        for (const resourceId of document.querySelectorAll(".resource-element .resourceId")) {
            for (const resource of resources) {
                if (Number(resourceId.value) === resource.id) {
                    resourceId.parentElement.querySelector(".status-resource .last-update-time-resource").textContent
                        = calculateLastUpdateTime(resource.lastUpdateDateTime);
                }
            }
        }
    }, 15000);

    function calculateLastUpdateTime(lastUpdateDateTime) {
        const luxonDifference = luxon.DateTime.now().diff(luxon.DateTime.fromISO(lastUpdateDateTime));
        const ms = luxonDifference.values.milliseconds;

        let formattedResult = "Last check: ";
        if (ms <= 1000) {
            formattedResult += "just now";
        } else if (ms > 1000 && ms <= 60000) {
            formattedResult += luxonDifference.toFormat("s") + " s ago";
        } else if (ms > 60_000 && ms <= 3_600_000) {
            formattedResult += luxonDifference.toFormat("m") + " min ago";
        } else if (ms > 3_600_000 && ms <= 86_400_000) {
            formattedResult += luxonDifference.toFormat("h") + " h ago";
        } else if (ms > 86_400_000) {
            formattedResult += "some time ago";
        }
        return formattedResult;
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
                    let resourcesElements = document.querySelectorAll(".resource-element");
                    for (const resourceElement of resourcesElements) {
                        if (Number(resourceElement.childNodes[0].value) === id) {
                            resourceElement.className = "resource-element " + json.data.status.toLowerCase();

                            let resourceObj = resources.filter(e => e.id === id)[0];
                            resourceObj.lastUpdateDateTime = luxon.DateTime.now().toISO()

                            resourceElement.querySelector(".status-resource .last-update-time-resource").textContent = calculateLastUpdateTime(resourceObj.lastUpdateDateTime);
                            resourceElement.querySelector(".status-resource .status-resource-title").textContent = buildStatusTitle(json.data.status.toLowerCase());
                            removeLoader(childDiv);
                            break;
                        }
                    }
                });
            });
    }
});
document.addEventListener('DOMContentLoaded', function () {

    let rootDiv = document.querySelector(".root");

    initResources();

    function getCountOfResources() {
        return fetch(getCurrentBrowserUrl() + "resources/count")
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }

    function initResources() {
        let response = getCountOfResources();
        response.then(response => {
            if (!response.data) {
                rootDiv.append(buildErrorMessage(response.message));
            } else {
                let countOfResources = response.data;
                for (let i = 0; i < countOfResources; i++) {
                    let childDiv = document.createElement("div");

                    childDiv.style.height = "calc(50vh - 2px)";
                    childDiv.className = "resource-element gray";

                    rootDiv.append(childDiv);
                    buildLoader(childDiv);

                    buildResource(childDiv, i);
                }
            }
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

                    childDiv.style.height = json.length <= 2 ? "calc(100vh - 2px)" : "calc(50vh - 2px)";

                    let resourceStatus = resource.status.toLowerCase();
                    childDiv.className = "resource-element " + (resourceStatus === undefined || resourceStatus == null ? "gray" : resourceStatus);

                    let spanElement = document.createElement("span");
                    spanElement.innerText = resource.name;

                    let anchorElement = document.createElement("a");
                    anchorElement.href = resource.path;
                    anchorElement.text = resource.path;
                    anchorElement.target = "_blank";

                    childDiv.append(spanElement, anchorElement);
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

    function buildErrorMessage(message) {
        let messageElement = document.createElement("span");
        messageElement.className = "message";
        messageElement.innerText = message;
        return messageElement;
    }

    function getResource(id, childDiv) {
        buildLoader(childDiv);

        fetch(getCurrentBrowserUrl() + "resources/" + id)
            .then(response => {
                response.json().then(function (json) {
                    let resources = document.querySelectorAll(".resource-element");
                    for (const resource of resources) {
                        if (Number(resource.childNodes[0].value) === id) {
                            resource.className = "resource-element " + json.data.status.toLowerCase();
                            removeLoader(childDiv);
                            break;
                        }
                    }
                });
            });
    }
});
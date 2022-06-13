document.addEventListener('DOMContentLoaded', function () {

    let rootElement = document.querySelector(".root");
    buildLoader(rootElement);

    fetch(document.location.href + "/resources")
        .then(response => {
            removeLoader();

            response.json().then(function (json) {
                buildUIResources(json);
            });
        });

    /**
     * Create table with resources.
     * Set height each div by condition:
     * 1. if count of resources less and equals 2 than set height is 100vh - 2px where "2px" is border size and "100vh" is all user viewport;
     * 2. Otherwise, 50vh - 2px where "2px" is border size and "50vh" a half from user viewport.
     *
     * @param json
     */
    function buildUIResources(json) {
        let rootDiv = document.querySelector(".root");

        if (!json.data) {
            rootDiv.append(buildErrorMessage(json.message));
        } else {
            for (let i = 0; i < json.data.length; i++) {
                let resource = json.data[i];

                let childDiv = document.createElement("div");
                addEvent(childDiv, "click", function () {
                    getResource(resource.id, childDiv)
                });

                let hiddenInput = document.createElement("input");
                hiddenInput.className = "resourceId";
                hiddenInput.value = resource.id;
                hiddenInput.hidden = true;
                childDiv.append(hiddenInput);

                childDiv.style.height = json.length <= 2 ? "calc(100vh - 2px)" : "calc(50vh - 2px)";

                let resourceStatus = resource.status.toLowerCase();
                childDiv.className = "resource-element " + (resourceStatus === undefined || resourceStatus == null ? "gray" : resourceStatus);

                let spanElement = document.createElement("span");
                spanElement.innerText = resource.name;

                let anchorElement = document.createElement("a");
                anchorElement.href = resource.path;
                anchorElement.text = resource.path;
                anchorElement.target = "_blank";

                childDiv.append(spanElement, anchorElement)

                rootDiv.append(childDiv);
            }
        }
    }

    function buildErrorMessage(message) {
        let messageElement = document.createElement("span");
        messageElement.className = "message";
        messageElement.innerText = message;
        return messageElement;
    }

    function getResource(id, childDiv) {
        buildLoader(childDiv);

        fetch(document.location.href + "/resources/" + id)
            .then(response => {
                removeLoader();

                response.json().then(function (json) {
                    let resources = document.querySelectorAll(".resource-element");
                    for (const resource of resources) {
                        if (Number(resource.childNodes[0].value) === id) {
                            resource.className = "resource-element " + json.data.status.toLowerCase();
                            break;
                        }
                    }
                });
            });
    }
});
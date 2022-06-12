document.addEventListener('DOMContentLoaded', function () {

    fetch(document.location.href + "/resources")
        .then(response => {
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

        for (let i = 0; i < json.data.length; i++) {
            let resource = json.data[i];

            let childDiv = document.createElement("div");
            addEvent(childDiv, "click", function () {
                getResource(resource.id)
            });

            childDiv.style.height = json.length <= 2 ? "calc(100vh - 2px)" : "calc(50vh - 2px)";

            childDiv.className = "resource-element";
            childDiv.style.backgroundColor = resource.status === undefined || resource.status == null ? "gray" : resource.status

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

    function getResource(id) {
        fetch(document.location.href + "/resources/" + id)
            .then(response => {
                response.json().then(function (json) {
                    let anchors = document.querySelectorAll("div a");
                    for (const anchor of anchors) {
                        let resource = json.data;
                        if (anchor.href.includes(resource.path)) {
                            anchor.parentElement.style.backgroundColor = resource.status;
                            break;
                        }
                    }
                });
            });
    }
});
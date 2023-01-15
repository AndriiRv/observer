
let initialIndex;
let selectedResource;

function addSwapEvent(resourceElement) {
    addEvent(resourceElement.querySelector(".resource-id-js"), "mousedown", function (event) {
        initialIndex = resourceElement.querySelector(".resource-id-js").textContent;
        selectedResource = startMove(resourceElement, event);

        function startMove(selectedElement, event) {
            let positionX = event.pageX;
            let positionY = event.pageY;

            addOriginalWidthToMovableResource(selectedElement, getOriginalSizeOfMovableResourceElement());

            selectedElement.style.position = "absolute";
            selectedElement.style.top = positionY + 10 + "px";
            selectedElement.style.left = positionX + 10 + "px";
            selectedElement.style.backgroundColor = "white";

            return selectedElement;

            function getOriginalSizeOfMovableResourceElement() {
                const width = selectedElement.clientWidth;
                const height = selectedElement.clientHeight;
                const widthId = selectedElement.querySelector(".resource-id-js").clientWidth;
                const widthName = selectedElement.querySelector(".resource-name-js").clientWidth;
                const widthPath = selectedElement.querySelector(".resource-path-js").clientWidth;
                const widthRemoveButton = selectedElement.querySelector(".resource-remove-js").clientWidth;

                return {
                    width: width,
                    height: height,
                    widthId: widthId,
                    widthName: widthName,
                    widthPath: widthPath,
                    widthRemoveButton: widthRemoveButton
                };
            }

            function addOriginalWidthToMovableResource(selectedElement, originalSizeObj) {
                selectedElement.style.width = originalSizeObj.width + "px";
                selectedElement.style.height = originalSizeObj.height + "px";

                selectedElement.querySelector(".resource-id-js").style.width = originalSizeObj.widthId + "px";
                selectedElement.querySelector(".resource-name-js").style.width = originalSizeObj.widthName + "px";
                selectedElement.querySelector(".resource-path-js").style.width = originalSizeObj.widthPath + "px";
                selectedElement.querySelector(".resource-remove-js").style.width = originalSizeObj.widthRemoveButton + "px";
            }
        }
    });

    addEvent(document.querySelector("body"), "mousemove", function (event) {
        if (selectedResource && window.getSelection) {
            window.getSelection().removeAllRanges();
        }

        moveResource(selectedResource, event);

        function moveResource(selectedElement, event) {
            if (!selectedElement) {
                return;
            }

            selectedElement.style.top = event.pageY + 10 + "px";
            selectedElement.style.left = event.pageX + 10 + "px";
        }
    });

    addEvent(resourceElement, "mouseup", function (event) {
        const elementFromCursorPoint = document.elementFromPoint(event.pageX, event.pageY);
        let resourceIdElement = elementFromCursorPoint.closest(".resource-js").querySelector(".resource-id-js");
        if (!initialIndex || resourceIdElement.textContent === initialIndex) {
            return;
        }

        selectedResource = null;
        swap(initialIndex, resourceIdElement.textContent);

        function swap(initialIndex, newIndex) {
            let url = new URL(indexPreferencesPage + "resources/swap");
            url.searchParams.set("selectedResourceId", initialIndex);
            url.searchParams.set("newSelectedIndex", newIndex);

            putAjaxRequest(url.toString(), reload, function (error) {
                const notification = new Notification("Error", error);
                notification.buildErrorNotificationOnBottomLeft();
            });
        }
    });

    addEvent(document.querySelector("body"), "mouseup", function (event) {
        resourceElement.style.position = "initial";
        selectedResource = null;
    });
}

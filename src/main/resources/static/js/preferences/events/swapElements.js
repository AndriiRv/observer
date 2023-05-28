
let initialIndex;
let selectedResource;

function addSwapEvent(selectedTableRow, idTd, endpoint) {
    addEvent(idTd, "mousedown", function (event) {
        initialIndex = idTd.textContent;
        selectedResource = startMove(selectedTableRow, event);

        function startMove(selectedTableRow, event) {
            let positionX = event.pageX;
            let positionY = event.pageY;

            selectedTableRow.style.position = "absolute";
            selectedTableRow.style.top = positionY + 10 + "px";
            selectedTableRow.style.left = positionX + 10 + "px";
            selectedTableRow.style.backgroundColor = "white";

            return selectedTableRow;
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

    addEvent(selectedTableRow, "mouseup", function (event) {
        const elementFromCursorPoint = document.elementFromPoint(event.pageX, event.pageY);
        const resourceIdElement = elementFromCursorPoint.closest("." + selectedTableRow.className).querySelector("." + idTd.className);
        if (!initialIndex || resourceIdElement.textContent === initialIndex) {
            return;
        }

        selectedResource = null;
        swap(initialIndex, resourceIdElement.textContent);

        function swap(initialIndex, newIndex) {
            const url = endpoint + "?selectedElementId=" + initialIndex + "&newSelectedIndex=" + newIndex;

            putAjaxRequest(url, reload, function (error) {
                const notification = new Notification("Error", error);
                notification.buildErrorNotificationOnBottomLeft();
            });
        }
    });

    addEvent(document.querySelector("body"), "mouseup", function () {
        selectedTableRow.style.position = "initial";
        selectedResource = null;
    });
}

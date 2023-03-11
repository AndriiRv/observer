
function addEventToImportTrigger(buttonElement) {
    let inputSelectorElement = document.querySelector(".input-selector-js");

    let isImportButtonClicked = true;
    addEvent(buttonElement, "click", function () {
        inputSelectorElement.style.display = isImportButtonClicked ? "block" : "none";
        isImportButtonClicked = !isImportButtonClicked;
    });

    addEvent(inputSelectorElement, "change", function () {
        const file = inputSelectorElement.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch(indexPreferencesPage + "resources/import", {
            method: 'PUT',
            body: formData
        }).then(response => {
            if (response.ok) {
                const waitingTimeMs = 1000;
                buildSuccessNotification(waitingTimeMs, "File uploaded.");

                setTimeout(function () {
                    window.reload();
                }, waitingTimeMs);
            } else {
                response.json().then(json => {
                    buildErrorNotification(3000, json.message);
                    inputSelectorElement.value = "";
                });
            }
        }).catch(error => {
            buildErrorNotification(3000, "Error during upload file.");
            inputSelectorElement.value = "";
        });
    });
}

function addEventToExportTrigger(buttonElement) {
    addEvent(buttonElement, "click", function () {
        fetch(indexPreferencesPage + "resources/export")
            .then(response => {
                if (response.ok) {
                    const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                    response.blob().then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);

                        buildSuccessNotification(3000, "File downloaded.");
                    }).catch(error => {
                        buildErrorNotification(3000, "Error during download file.");
                    });
                } else {
                    buildErrorNotification(3000, "Error during download file.");
                }
            });
    });
}

function buildSuccessNotification(waitingTimeMs, descriptionStr) {
    const notification = new Notification("Success", descriptionStr);
    notification.timeMs = waitingTimeMs;
    notification.buildInfoNotificationOnBottomLeft();
}

function buildErrorNotification(waitingTimeMs, descriptionStr) {
    const notification = new Notification("Error", descriptionStr);
    notification.timeMs = waitingTimeMs;
    notification.buildErrorNotificationOnBottomLeft();
}


document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector("body");

    const resourceDiv = buildDiv("observer-table-div");
    resourceDiv.append(buildPreferenceTable(
        body.getAttribute("data-get-all-resources-url"),
        body.getAttribute("data-resource-import-url"),
        body.getAttribute("data-resource-export-url"),
        body.getAttribute("data-save-resource-url"),
        body.getAttribute("data-update-resource-url"),
        body.getAttribute("data-remove-resource-url"),
        body.getAttribute("data-swap-resource-url"),
        body.getAttribute("data-preferences-index-page-url"),
        true
    ));

    const networkDiv = buildDiv("observer-table-div");
    networkDiv.append(buildPreferenceTable(
        body.getAttribute("data-get-all-network-check-url"),
        body.getAttribute("data-network-check-import-url"),
        body.getAttribute("data-network-check-export-url"),
        body.getAttribute("data-save-network-check-url"),
        body.getAttribute("data-update-network-check-url"),
        body.getAttribute("data-remove-network-check-url"),
        body.getAttribute("data-swap-network-check-url"),
        body.getAttribute("data-preferences-index-page-url"),
        false
    ));

    document.querySelector(".root").append(resourceDiv, networkDiv);

    const otherPreferencesDiv = buildDiv("observer-other-preferences-div");
    const exportLogsButton = buildButton("btn btn-primary export-file-js", "Export logs");
    otherPreferencesDiv.append(exportLogsButton);
    addEventToExportTrigger(exportLogsButton, body.getAttribute("data-export-logs-url"));

    document.querySelector(".additional-division").append(otherPreferencesDiv);

});


function buildOtherPreferences(body) {
    const otherPreferencesDiv = buildDiv("observer-other-preferences-div");
    const header = document.createElement("h3");
    header.textContent = "Other preferences";
    otherPreferencesDiv.append(header);

    const otherPreferencesTablesDiv = buildDiv("observer-other-preferences-tables-div");
    otherPreferencesDiv.append(otherPreferencesTablesDiv);

    const observerTable = new ObserverTable();
    otherPreferencesTablesDiv.append(buildObserverLogsTable(observerTable));

    return otherPreferencesDiv;

    function buildObserverLogsTable(observerTable) {
        const exportLogsButton = buildButton("btn btn-primary export-file-js", "Export logs");
        addEventToExportTrigger(exportLogsButton, body.getAttribute("data-export-logs-url"));

        const table = observerTable.createTable();

        const thead = observerTable.createTHead("");
        table.append(thead);

        const tr = observerTable.createTr();
        tr.append(observerTable.createTd("", "", buildDivHeader(5, "Observer logs")));
        thead.append(tr);

        const tbody = observerTable.createTBody();
        table.append(tbody);
        tbody.append(buildTr(null, "Export logs", exportLogsButton));
        return table;
    }

    /**
     * Build header division.
     *
     * @param {Number} headerLevel
     * @param {String} text
     * @returns {HTMLElement}
     */
    function buildDivHeader(headerLevel, text) {
        const header = document.createElement("h" + headerLevel);
        header.textContent = text;
        return header;
    }

    /**
     * Build table row with first table data as label ad second as passed element
     *
     * @param classNameStr
     * @param labelText
     * @param element
     * @returns {HTMLElement}
     */
    function buildTr(classNameStr, labelText, element) {
        const tr = observerTable.createTr(classNameStr);

        const tdLabel = observerTable.createTd();
        const label = document.createElement("label");
        label.textContent = labelText;
        tdLabel.append(label);
        tr.append(tdLabel)

        const tdData = observerTable.createTd();
        tdData.append(element);
        tr.append(tdData);

        return tr;
    }
}

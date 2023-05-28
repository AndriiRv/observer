function buildPreferenceTable(endpoint, importUrl, exportUrl, saveElementUrl, updateElementUrl, removeUrl, swapUrl, preferenceIndexPageUrl, isNavigableObserverElement) {
    const observerTable = new ObserverTable();
    const table = observerTable.createTable("table table-bordered table-hover observer-element-table");

    const thead = observerTable.createTHead();
    thead.append(
        buildHeaderRow(importUrl, exportUrl),
        buildSaveResourceRow(saveElementUrl)
    );
    table.append(thead);

    const tbody = observerTable.createTBody();
    Promise.all([buildResourcesToTableRow(observerTable, tbody, removeUrl, preferenceIndexPageUrl, swapUrl, isNavigableObserverElement)])
        .then(() => {
            table.append(tbody);
        });
    return table;

    function buildHeaderRow(importUrl, exportUrl) {
        let tr = observerTable.createTr();

        let thContent = observerTable.createTh();
        buildImportExport(thContent, importUrl, exportUrl);

        tr.append(
            observerTable.createTh(null, "ID"),
            observerTable.createTh(null, "Name"),
            observerTable.createTh(null, "URL"),
            thContent
        );
        return tr;

        function buildImportExport(thContent, importUrl, exportUrl) {
            const importButtonElement = buildButton("btn btn-primary import-file-js", "Import");
            const exportButtonElement = buildButton("btn btn-primary export-file-js", "Export");
            const inputFileElement = buildInputFile("file", "form-control input-selector-js", null, "txt");
            thContent.append(importButtonElement, exportButtonElement, inputFileElement);

            addEventToImportTrigger(importButtonElement, inputFileElement, importUrl);
            addEventToExportTrigger(exportButtonElement, exportUrl);
        }
    }

    function buildSaveResourceRow(saveElementUrl) {
        const tr = observerTable.createTr();

        const nameResourceTh = observerTable.createTh();
        const newNameInput = buildInput("text", "form-control name-new-js", "Name");
        nameResourceTh.append(newNameInput);

        const pathResourceTh = observerTable.createTh();
        const newPathInput = buildInput("text", "form-control path-new-js", "Path");
        pathResourceTh.append(newPathInput);

        const saveResourceTh = observerTable.createTh("save-new-js");
        const saveElementButton = buildButton("btn btn-primary", "Save");
        saveResourceTh.append(saveElementButton);
        initSaveResource(newNameInput, newPathInput, saveElementButton, saveElementUrl);

        tr.append(observerTable.createTh(), nameResourceTh, pathResourceTh, saveResourceTh);
        return tr;
    }

    /**
     *
     *
     * @param {ObserverTable} observerTable
     * @param tbody
     * @returns {Promise<void>}
     */
    async function buildResourcesToTableRow(observerTable, tbody, removeUrl, preferenceIndexPageUrl, swapUrl, isNavigableObserverElement) {
        await fetch(endpoint)
            .then(async response => {
                await response.json().then(function (json) {
                    json.data.forEach(observerElement => {
                        tbody.append(buildResourceTr(observerTable, observerElement, removeUrl, preferenceIndexPageUrl, swapUrl, isNavigableObserverElement));
                    })
                });
            });

        function buildResourceTr(observerTable, observerElement, removeUrl, preferenceIndexPageUrl, swapUrl, isNavigableObserverElement) {
            let tr = observerTable.createTr("observer-element-row-js");

            let idTd = observerTable.createTd("id-js", observerElement.id);
            idTd.title = "Hold and move vertically to change order";

            let nameTd = observerTable.createTd("name-js", observerElement.name);
            addRenameEventToResource(nameTd, updateElementUrl, false);

            let pathTd = observerTable.createTd("path-js");

            pathTd.append(isNavigableObserverElement ? buildAnchor(observerElement.path) : buildSpan(null, observerElement.path));
            addRenameEventToResource(pathTd, updateElementUrl, isNavigableObserverElement);

            const removeTd = observerTable.createTd("remove-js");
            const removeButton = buildButton("btn btn-primary", "Remove");
            removeTd.append(removeButton);
            addClickEventToRemoveButton(idTd, nameTd, removeButton, removeUrl, preferenceIndexPageUrl)

            tr.append(idTd, nameTd, pathTd, removeTd);
            addSwapEvent(tr, idTd, swapUrl);
            return tr;
        }
    }
}

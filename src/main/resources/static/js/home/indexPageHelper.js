
/**
 * Build table by passed observer element data.
 *
 * @param {String} fetchAllObserverElementsUrl
 * @param {String} fetchObserverElementByIdUrl
 * @param {boolean} isNavigableObserverElement
 * @param {ObserverWebSocket} observerWebSocket
 * @returns {HTMLTableElement}
 */
function buildTable(fetchAllObserverElementsUrl, fetchObserverElementByIdUrl, isNavigableObserverElement, observerWebSocket) {
    let filterInput = null;
    let observerElementNames = [];

    const observerTable = new ObserverTable();
    const table = observerTable.createTable("table table-bordered table-hover");
    table.append(buildTHead());

    const tbody = observerTable.createTBody();
    loadTableRows(tbody);

    table.append(tbody);

    function loadTableRows(tbody) {
        fetch(fetchAllObserverElementsUrl).then(response => response.json())
            .then(json => {
                const jsonArray = json.data;
                if (!jsonArray.length) {
                    return;
                }

                jsonArray.forEach(observerElement => {
                    observerElementNames.push(observerElement.name);
                });
                observerDynamicElementPlaceholder(filterInput, observerElementNames);

                const observerElementTrs = buildTableRows(jsonArray.map(json => ObserverElement.fromJson(json)));
                for (let i = 0; i < observerElementTrs.length; i++) {
                    const tr = observerElementTrs[i];
                    tbody.append(tr);

                    const id = i + 1;
                    fetch(fetchObserverElementByIdUrl + "/" + id).then(response => response.json()
                        .then(json => {
                            buildInitObserverStatusTd(id, tr, ObserverElement.fromJson(json.data));
                        }));
                }
            });
    }

    function buildTHead() {
        const thead = observerTable.createTHead();
        const theadTr = observerTable.createTr();

        const tHeadName = observerTable.createTh();
        const tHeadStatus = observerTable.createTh();

        const filterInputDiv = buildDiv("filter-input-div");
        filterInput = buildInput("search", "form-control", "Search...");
        const searchPreferencesButton = buildButton("btn btn-primary search-preferences", "Placeholder");
        searchPreferencesButton.hidden = true;
        filterInputDiv.append(filterInput, searchPreferencesButton);

        addEventToElements([filterInput, searchPreferencesButton], "mouseenter", function () {
            searchPreferencesButton.hidden = false;
        });
        addEventToElements([filterInput, searchPreferencesButton], "mouseout", function () {
            searchPreferencesButton.hidden = true;
        });

        let isClicked = false;
        addEvent(searchPreferencesButton, "click", function () {
            if (!isClicked) {
                const theadTr = observerTable.createTr("additional-table-row");
                const theadTh = observerTable.createTh();
                theadTh.colSpan = 2;
                theadTh.append(buildInputPlaceholderPreferences());
                theadTr.append(theadTh);
                thead.append(theadTr);
                isClicked = true;
            } else {
                document.querySelectorAll(".additional-table-row")?.forEach(e => e?.remove());
                isClicked = false;
            }
        });

        tHeadName.append(filterInputDiv);

        const observerSelect = new ObserverSelect(
            "form-control",
            ["All statuses", "[inactive]", "[active]", "[issues are exists]"],
            ["", "[inactive]", "[active]", "[issues are exists]"]
        );
        const buildStatuses = observerSelect.buildSelect();
        tHeadStatus.append(buildStatuses);

        theadTr.append(tHeadName, tHeadStatus);

        const observerFilters = [
            new ObserverFilter(filterInput, ".observer-element-name"),
            new ObserverFilter(buildStatuses, ".observer-element-status-title")
        ]
        new ObserverFilters(observerFilters).init();

        thead.append(theadTr);
        return thead;
    }

    /**
     *
     *
     * @param tbody
     * @param {ObserverElement[]} observerElements
     * @returns {*[]}
     */
    function buildTableRows(observerElements) {
        let tableRows = [];
        for (let i = 0; i < observerElements.length; i++) {
            const observerElement = observerElements[i];

            const tr = observerTable.createTr("observer-element-row");
            const td = observerTable.createTd();

            const nameDiv = buildDiv("observer-element-data");
            nameDiv.append(
                buildSpan("observer-element-name", observerElement.name, true),
                isNavigableObserverElement ? buildAnchor(observerElement.path) : buildSpan(null, observerElement.path)
            );
            td.append(nameDiv);

            const statusTd = observerTable.createTd("observer-element-status");
            addLoader(statusTd);

            tr.append(td, statusTd);
            tableRows.push(tr);
        }
        return tableRows;
    }

    document.addEventListener("buildStatus", (e) => {
            updateStatus(e.detail);

            /**
             * WebSocket callback
             *
             * @param observerElementObj
             */
            function updateStatus(observerElementObj) {
                const statusTd = document.querySelectorAll(".observer-table-div." + observerElementObj.observerName?.toLowerCase() + " .observer-element-status")[observerElementObj.id - 1];
                buildStatus(statusTd, observerElementObj.status);
            }
        }, false,
    );

    /**
     *
     *
     * @param id
     * @param tr
     * @param {ObserverElement} observerElementObj
     */
    function buildInitObserverStatusTd(id, tr, observerElementObj) {
        let statusTd = tr.querySelector("td.observer-element-status");
        buildStatus(statusTd, observerElementObj.status);

        addEventsToObserverStatus(statusTd);

        function addEventsToObserverStatus(statusTd) {
            addEvent(statusTd, "click", async function () {
                if (isAlreadyClicked(statusTd, "loader")) {
                    return;
                }

                observerWebSocket.sendRequest({"id": id});

                addLoader(statusTd);
                statusTd.classList.remove(observerElementObj.status.toLowerCase(), "gray");
                statusTd.querySelector(".observer-element-status-title")?.remove();
                statusTd.querySelector(".last-update-time")?.remove();
            });
        }

        function isAlreadyClicked(statusTd, className) {
            return statusTd.classList.contains(className);
        }
    }

    function buildStatus(statusTd, status){
        removeLoader(statusTd);

        statusTd.classList.remove(status.toLowerCase(), "gray");
        statusTd.classList.add(!status ? "gray" : status.toLowerCase());
        statusTd.querySelector(".observer-element-status-title")?.remove();
        statusTd.append(buildSpan("observer-element-status-title", buildStatusTitles(status),"Click to update status"));

        statusTd.setAttribute("data-last-update-time", luxon.DateTime.now().toISO());

        statusTd.querySelector(".last-update-time")?.remove();
        statusTd.append(buildSpan("last-update-time", calculateLastUpdateTime(luxon.DateTime.now().toISO())));
    }

    return table;
}

function buildStatusTitles(status) {
    let result;
    status = status.toLowerCase();
    if (status === "red") {
        result = "[inactive]";
    } else if (status === "orange") {
        result = "[issues are exists]";
    } else {
        result = "[active]";
    }
    return result;
}

setInterval(function () {
    for (const statusTdElement of document.querySelectorAll(".observer-element-status")) {
        const lastUpdateTimeSpanElement = statusTdElement.querySelector(".last-update-time");
        if (lastUpdateTimeSpanElement) {
            lastUpdateTimeSpanElement.textContent
                = calculateLastUpdateTime(statusTdElement.getAttribute("data-last-update-time"));
        }
    }
}, 15000);

/**
 * Calculate Last update time observer element
 *
 * @param {String} lastUpdateDateTime
 * @returns {string}
 */
function calculateLastUpdateTime(lastUpdateDateTime) {
    const luxonDifference = luxon.DateTime.now().diff(luxon.DateTime.fromISO(lastUpdateDateTime));
    return formatResult(luxonDifference.values ? luxonDifference.values.milliseconds : 0);

    /**
     * Format last update time result as String.
     *
     * @param {number} ms last update time in milliseconds.
     * @returns {string} formatted result.
     */
    function formatResult(ms) {
        let formattedResult = "Last check: ";
        if (ms <= 1000) {
            formattedResult += "just now";
        } else if (ms > 1000 && ms <= 60000) {
            formattedResult += luxonDifference.toFormat("s") + " s ago";
        } else if (ms > 60_000 && ms <= 3_600_000) {
            formattedResult += luxonDifference.toFormat("m") + " min ago";
        } else if (ms > 3_600_000 && ms <= 86_400_000) {
            formattedResult += luxonDifference.toFormat("h") + " h ago";
        } else {
            formattedResult += "some time ago";
        }
        return formattedResult
    }
}

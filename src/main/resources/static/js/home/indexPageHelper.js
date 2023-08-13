
/**
 * Build table by passed observer element data.
 *
 * @param {String} observerElementName
 * @param {String} fetchAllObserverElementsUrl
 * @param {String} fetchObserverElementByIdUrl
 * @param {boolean} isNavigableObserverElement
 * @param {ObserverWebSocket} observerWebSocket
 * @returns {HTMLTableElement}
 */
function buildTable(observerElementName, fetchAllObserverElementsUrl, fetchObserverElementByIdUrl, isNavigableObserverElement, observerWebSocket) {
    const observerTable = new ObserverTable();
    const table = observerTable.createTable("table table-bordered table-hover");
    table.append(buildTHead(observerElementName));

    const tbody = observerTable.createTBody();
    loadTableRows(tbody);

    table.append(tbody);
    return table;

    function loadTableRows(tbody) {
        fetch(fetchAllObserverElementsUrl).then(response => response.json())
            .then(json => {
                const jsonArray = json.data;
                if (!jsonArray.length) {
                    return;
                }

                const observerElementTrs = buildTableRows(jsonArray.map(json => ObserverElement.fromJson(json)));
                for (let i = 0; i < observerElementTrs.length; i++) {
                    const tr = observerElementTrs[i];
                    tbody.append(tr);

                    const id = i + 1;
                    fetch(fetchObserverElementByIdUrl + "/" + id).then(response => response.json()
                        .then(json => {
                            buildObserverStatusTd(id, tr, ObserverElement.fromJson(json.data));
                        }));
                }
            });
    }

    function buildTHead(observerElementName) {
        const thead = observerTable.createTHead();
        const theadTr = observerTable.createTr();

        const tHeadName = observerTable.createTh();
        tHeadName.append(buildSpan("observer-element-title", observerElementName));

        const tHeadStatus = observerTable.createTh();
        tHeadStatus.append(buildSpan("observer-element-title", "Status"));

        const filterInput = buildInput("search", "form-control", "Search...");
        tHeadName.append(filterInput);

        const observerSelect = new ObserverSelect(
            "form-control",
            ["All", "[inactive]", "[active]", "[issues are exists]"],
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

    /**
     *
     *
     * @param id
     * @param tr
     * @param {ObserverElement} observerElementObj
     */
    function buildObserverStatusTd(id, tr, observerElementObj) {
        let statusTd = tr.querySelector("td.observer-element-status");
        removeLoader(statusTd);

        statusTd.classList.remove(observerElementObj.status.toLowerCase(), "gray");
        statusTd.classList.add(observerElementObj.status === undefined || observerElementObj.status == null ? "gray" : observerElementObj.status.toLowerCase());
        statusTd.append(buildSpan("observer-element-status-title", buildStatusTitles(observerElementObj.status),"Click to update status"));

        statusTd.setAttribute("data-last-update-time", luxon.DateTime.now().toISO());

        statusTd.querySelector(".last-update-time")?.remove();
        statusTd.append(buildSpan("last-update-time", calculateLastUpdateTime(luxon.DateTime.now().toISO())));

        if (observerElementObj.status) {
            statusTd.setAttribute("data-status", observerElementObj.status.toLowerCase());
        }

        addEventsToObserverStatus(tr, statusTd);

        function addEventsToObserverStatus(tr, statusTd) {
            addEvent(statusTd, "mouseenter", function (event) {
                let observerRow = event.target;
                document.querySelector("body").className = observerRow.getAttribute("data-status").toLowerCase();
            });
            addEvent(statusTd, "mouseleave", function () {
                document.querySelector("body").className = "";
            });
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
            removeLoader(statusTd);

            statusTd.classList.remove(observerElementObj.status.toLowerCase(), "gray");
            statusTd.querySelector(".observer-element-status-title")?.remove();
            statusTd.querySelector(".last-update-time")?.remove();

            statusTd.classList.add(observerElementObj.status === undefined || observerElementObj.status == null ? "gray" : observerElementObj.status.toLowerCase());
            statusTd.append(buildSpan("observer-element-status-title", buildStatusTitles(observerElementObj.status),"Click to update status"));

            statusTd.setAttribute("data-last-update-time", luxon.DateTime.now().toISO());
            statusTd.append(buildSpan("last-update-time", calculateLastUpdateTime(luxon.DateTime.now().toISO())));

            if (observerElementObj.status) {
                statusTd.setAttribute("data-status", observerElementObj.status.toLowerCase());
            }
        }
    }, false,
);

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

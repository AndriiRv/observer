
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
    let observerElementsCount = 0;
    let observerElementTrs = [];

    const observerTable = new ObserverTable();
    const table = observerTable.createTable("table table-bordered table-hover");
    table.append(buildTHead(observerElementName));

    const tbody = observerTable.createTBody();
    Promise.all([fetchAllObserverElements(fetchAllObserverElementsUrl, tbody, buildTableRows)])
        .then(() => {
            if (!observerElementsCount) {
                return;
            }
            for (let i = 0; i < observerElementTrs.length; i++) {
                fetchObserverElementById(fetchObserverElementByIdUrl, i + 1, observerElementTrs[i], buildObserverStatusTd);
            }
        });
    table.append(tbody);
    return table;

    function buildTHead(observerElementName) {
        const thead = observerTable.createTHead();
        const theadTr = observerTable.createTr();

        const tHeadName = observerTable.createTh(null, observerElementName);
        const tHeadStatus = observerTable.createTh(null, "Status");

        const observerSelect = new ObserverSelect(
            null,
            ["All", "[inactive]", "[active]", "[issues are exists]"],
            ["", "[inactive]", "[active]", "[issues are exists]"]
        );
        const buildStatuses = observerSelect.buildSelect();
        tHeadStatus.append(buildStatuses);
        initFilterStatuses(buildStatuses);

        theadTr.append(tHeadName, tHeadStatus);

        const filterTr = observerTable.createTr();
        const filterTd = observerTable.createTd("observer-element-filter");
        filterTd.colSpan = 2;

        const filterInput = buildInput("search", "form-control", "Search...");
        filterObserverElements(filterInput);
        filterTd.append(filterInput);
        filterTr.append(filterTd);

        thead.append(theadTr, filterTr);
        return thead;
    }

    async function fetchAllObserverElements(fetchAllObserverElementsUrl, tbody, callback) {
        return await fetch(fetchAllObserverElementsUrl)
            .then(async response => {
                await response.json().then(function (json) {
                    const observerElementsArrayObj = json.data;

                    callback(tbody, observerElementsArrayObj);
                    observerElementsCount = observerElementsArrayObj.length;
                });
            });
    }

    function buildTableRows(tbody, elements) {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            const tr = observerTable.createTr("observer-element-row");
            let td = observerTable.createTd();

            let nameDiv = buildDiv("observer-element-data");
            nameDiv.append(
                buildSpan("observer-element-name", element.name, true),
                isNavigableObserverElement ? buildAnchor(element.path) : buildSpan(null, element.path)
            );
            td.append(nameDiv);

            let statusTd = observerTable.createTd("observer-element-status");
            addLoader(statusTd);

            tr.append(td, statusTd);
            tbody.append(tr);

            observerElementTrs[i] = tr;
        }
    }

    function buildObserverStatusTd(id, tr, observerElementObj) {
        let statusTd = tr.querySelector("td.observer-element-status");

        statusTd.classList.remove(observerElementObj.status.toLowerCase(), "gray");
        statusTd.classList.add(observerElementObj.status === undefined || observerElementObj.status == null ? "gray" : observerElementObj.status.toLowerCase());
        statusTd.append(buildSpan("observer-element-status-title", buildStatusTitles(observerElementObj.status),"Click to update status"));

        statusTd.setAttribute("data-last-update-time", luxon.DateTime.now().toISO());

        statusTd.querySelector(".last-update-time")?.remove();
        statusTd.append(buildSpan("last-update-time", calculateLastUpdateTime(luxon.DateTime.now().toISO())));

        if (observerElementObj.status) {
            statusTd.setAttribute("data-status", observerElementObj.status.toLowerCase());
        }
        removeLoader(statusTd);

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

    function fetchObserverElementById(fetchObserverElementByIdUrl, id, tr, callback) {
        return fetch(fetchObserverElementByIdUrl + "/" + id)
            .then(response => {
                response.json().then(function (json) {
                    callback(id, tr, json.data);
                });
            });
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
            addLoader(statusTd);
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
            removeLoader(statusTd);
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

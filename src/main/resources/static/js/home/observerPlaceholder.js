
function observerDynamicElementPlaceholder(element, placeholders) {
    const checkboxValue = localStorage.getItem("observer.dynamic.placeholder.enabled");
    if (!checkboxValue || checkboxValue === "false") {
        return;
    }

    const initPlaceHolder = element.placeholder + " ";
    let initTimeout = localStorage.getItem("observer.init.timeout.placeholder") + "000";
    let loopTimeout = localStorage.getItem("observer.next.loop.timeout.placeholder") + "000";
    let waitingTimeout = localStorage.getItem("observer.waiting.timeout.placeholder") + "000";
    let writingCharVelocityTimeout = localStorage.getItem("observer.writing.timeout.placeholder");

    let timeoutVar = null;
    timeoutVar = setTimeout(function () {
        initDynamicPlaceholder();
    }, initTimeout);

    async function initDynamicPlaceholder() {
        for (const placeholder of placeholders) {
            element.placeholder = element.placeholder + " ";

            for (const placeholderChar of placeholder) {
                await sleep(writingCharVelocityTimeout).then(() => {
                    element.placeholder += placeholderChar;
                });
            }
            await sleep(waitingTimeout).then(() => {
                element.placeholder = initPlaceHolder;
            });
        }
        clearTimeout(timeoutVar);
        timeoutVar = setTimeout(initDynamicPlaceholder, loopTimeout);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

function buildInputPlaceholderPreferences() {
    const otherPreferencesDiv = buildDiv("observer-other-preferences-div");

    const otherPreferencesTablesDiv = buildDiv("observer-other-preferences-tables-div");
    otherPreferencesDiv.append(otherPreferencesTablesDiv);

    const observerTable = new ObserverTable();
    otherPreferencesTablesDiv.append(buildSearchDynamicPlaceholderTable(observerTable))

    return otherPreferencesDiv;

    function buildSearchDynamicPlaceholderTable(observerTable) {
        const table = observerTable.createTable();

        const thead = observerTable.createTHead("");
        table.append(thead);
        const tr = observerTable.createTr();
        tr.append(observerTable.createTd("", "", buildDivHeader(5, "Manage Search Filter dynamic placeholder")));
        thead.append(tr);
        const trAdditionalInfo = observerTable.createTr();
        trAdditionalInfo.append(observerTable.createTd("", "", buildDivHeader(6, "Changes will apply after reload the page")));
        thead.append(trAdditionalInfo);

        const tbody = observerTable.createTBody();
        table.append(tbody);

        const checkbox = buildCheckbox("checkbox");
        const trCheckbox = buildTr(null, "Enable dynamic placeholder", checkbox);
        tbody.append(trCheckbox);
        addEvent(checkbox, "click", function (event) {
            let infoMessage;
            if (event.target.checked) {
                initDefaultDynamicPlaceholderPreferences(checkbox, initTimeoutInput, nextLoopTimeoutInput, waitingTimeoutInput, writingTimeoutInput);
                infoMessage = "Search Filter dynamic placeholder enabled."
            } else {
                localStorage.removeItem("observer.dynamic.placeholder.enabled");
                localStorage.removeItem("observer.init.timeout.placeholder");
                localStorage.removeItem("observer.next.loop.timeout.placeholder");
                localStorage.removeItem("observer.waiting.timeout.placeholder");
                localStorage.removeItem("observer.writing.timeout.placeholder");
                document.querySelectorAll(".placeholder-preferences-input").forEach(e => e.value = "");
                infoMessage = "Search Filter dynamic placeholder disabled."
            }
            buildNotification(infoMessage);
        });

        const initTimeoutInput = buildNumberInput("placeholder-preferences-input", "seconds", "0", "60");
        tbody.append(buildPreferenceNumberRow(initTimeoutInput, "Timeout before start after page loaded (s)", function (event) {
            localStorage.setItem("observer.init.timeout.placeholder", event.target.value);
            buildNotification("Timeout before start after page loaded - saved.");
        }));

        const nextLoopTimeoutInput = buildNumberInput("placeholder-preferences-input", "seconds", "3", "60");
        tbody.append(buildPreferenceNumberRow(nextLoopTimeoutInput, "Timeout before start a next placeholders iteration after ending the previous one (s)", function (event) {
            localStorage.setItem("observer.next.loop.timeout.placeholder", event.target.value);
            buildNotification("Timeout before start a next placeholders iteration after ending the previous one - saved.");
        }));

        const waitingTimeoutInput = buildNumberInput("placeholder-preferences-input", "seconds", "3", "60");
        tbody.append(buildPreferenceNumberRow(waitingTimeoutInput, "Timeout before render next placeholder of current iteration (s)", function (event) {
            localStorage.setItem("observer.waiting.timeout.placeholder", event.target.value);
            buildNotification("Timeout before render next placeholder of current iteration - saved.");
        }));

        const writingTimeoutInput = buildNumberInput("placeholder-preferences-input", "ms", "100", "1000");
        tbody.append(buildPreferenceNumberRow(writingTimeoutInput, "Render placeholder velocity (ms). Bigger is slower.", function (event) {
            localStorage.setItem("observer.writing.timeout.placeholder", event.target.value);
            buildNotification("Render placeholder velocity - saved.");
        }));

        restoreValuesFromLocalStorageForDynamicPlaceholderPreferences(checkbox, initTimeoutInput, nextLoopTimeoutInput, waitingTimeoutInput, writingTimeoutInput);

        return table;

        function initDefaultDynamicPlaceholderPreferences(checkbox, initTimeoutInput, nextLoopTimeoutInput, waitingTimeoutInput, writingTimeoutInput) {
            let observerDynamicFilter = new ObserverDynamicFilter()
            observerDynamicFilter.enabled = "true";

            setDefaultValueToElementAndLocalStorage(checkbox, observerDynamicFilter.enabled, "observer.dynamic.placeholder.enabled");
            setDefaultValueToElementAndLocalStorage(initTimeoutInput, observerDynamicFilter.initTimeout, "observer.init.timeout.placeholder");
            setDefaultValueToElementAndLocalStorage(nextLoopTimeoutInput, observerDynamicFilter.nextLoopTimeout, "observer.next.loop.timeout.placeholder");
            setDefaultValueToElementAndLocalStorage(waitingTimeoutInput, observerDynamicFilter.waitingTimeout, "observer.waiting.timeout.placeholder");
            setDefaultValueToElementAndLocalStorage(writingTimeoutInput, observerDynamicFilter.writingTimeout, "observer.writing.timeout.placeholder");

            function setDefaultValueToElementAndLocalStorage(element, value, localStorageKey) {
                if (element.type === "checkbox") {
                    element.checked = value;
                } else {
                    element.value = value;
                }
                localStorage.setItem(localStorageKey, value);
            }
        }
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

    function buildPreferenceNumberRow(input, labelText, eventFunction) {
        const tr = buildTr("placeholder-preferences", labelText, input);
        addEvent(input, "change", eventFunction);
        return tr;
    }

    function restoreValuesFromLocalStorageForDynamicPlaceholderPreferences(checkbox, initTimeoutInput, nextLoopTimeoutInput, waitingTimeoutInput, writingTimeoutInput) {
        checkbox.checked = localStorage.getItem("observer.dynamic.placeholder.enabled");
        initTimeoutInput.value = localStorage.getItem("observer.init.timeout.placeholder");
        nextLoopTimeoutInput.value = localStorage.getItem("observer.next.loop.timeout.placeholder");
        waitingTimeoutInput.value = localStorage.getItem("observer.waiting.timeout.placeholder");
        writingTimeoutInput.value = localStorage.getItem("observer.writing.timeout.placeholder");
    }

    function buildNotification(description) {
        new Notification(
            "Success",
            description,
            NotificationLocation.NOTIFICATION_LOCATION.BOTTOM_RIGHT,
            NotificationType.NOTIFICATION_TYPE.INFO,
            3000
        ).buildNotification();
    }
}

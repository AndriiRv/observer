
function buildOtherPreferences(body) {
    const otherPreferencesDiv = buildDiv("observer-other-preferences-div");
    const header = document.createElement("h3");
    header.textContent = "Other preferences";
    otherPreferencesDiv.append(header);

    const observerTable = new ObserverTable();
    const table = observerTable.createTable();
    otherPreferencesDiv.append(table);

    const tbody = observerTable.createTBody();
    table.append(tbody);

    const observerDynamicFilter = new ObserverDynamicFilter();

    const checkbox = buildCheckbox("checkbox");
    const trCheckbox = buildTr(null, "Enable dynamic search filter placeholder", checkbox);
    tbody.append(trCheckbox);
    addEvent(checkbox, "click", function (event) {
        if (event.target.checked) {
            initDefaultDynamicPlaceholderPreferences(checkbox, initTimeoutInput, nextLoopTimeoutInput, waitingTimeoutInput, writingTimeoutInput);
        } else {
            localStorage.removeItem("observer.dynamic.placeholder.enabled");
            localStorage.removeItem("observer.init.timeout.placeholder");
            localStorage.removeItem("observer.next.loop.timeout.placeholder");
            localStorage.removeItem("observer.waiting.timeout.placeholder");
            localStorage.removeItem("observer.writing.timeout.placeholder");
            document.querySelectorAll(".placeholder-preferences-input").forEach(e => e.value = "");
        }
    });

    const initTimeoutInput = buildNumberInput("placeholder-preferences-input", "seconds", "0", "60");
    tbody.append(buildPreferenceNumberRow(initTimeoutInput, "Begin dynamic 'Search' filter placeholder change after (s)", function (event) {
        observerDynamicFilter.initTimeout = event.target.value;
        localStorage.setItem("observer.init.timeout.placeholder", observerDynamicFilter.initTimeout);
    }));

    const nextLoopTimeoutInput = buildNumberInput("placeholder-preferences-input", "seconds", "3", "60");
    tbody.append(buildPreferenceNumberRow(nextLoopTimeoutInput, "Next 'Search' filter placeholders iteration after (s)", function (event) {
        observerDynamicFilter.nextLoopTimeout = event.target.value;
        localStorage.setItem("observer.next.loop.timeout.placeholder", observerDynamicFilter.nextLoopTimeout);
    }));

    const waitingTimeoutInput = buildNumberInput("placeholder-preferences-input", "seconds", "3", "60");
    tbody.append(buildPreferenceNumberRow(waitingTimeoutInput, "Waiting 'Search' filter rendered dynamic placeholder before changing after (s)", function (event) {
        observerDynamicFilter.waitingTimeout = event.target.value;
        localStorage.setItem("observer.waiting.timeout.placeholder", observerDynamicFilter.waitingTimeout);
    }));

    const writingTimeoutInput = buildNumberInput("placeholder-preferences-input", "ms", "100", "1000");
    tbody.append(buildPreferenceNumberRow(writingTimeoutInput, "Writing 'Search' filter placeholder char by char velocity after (ms)", function (event) {
        observerDynamicFilter.writingTimeout = event.target.value;
        localStorage.setItem("observer.writing.timeout.placeholder", observerDynamicFilter.writingTimeout);
    }));

    restoreValuesFromLocalStorageForDynamicPlaceholderPreferences(checkbox, initTimeoutInput, nextLoopTimeoutInput, waitingTimeoutInput, writingTimeoutInput);

    const exportLogsButton = buildButton("btn btn-primary export-file-js", "Export logs");
    otherPreferencesDiv.append(exportLogsButton);
    addEventToExportTrigger(exportLogsButton, body.getAttribute("data-export-logs-url"));
    const trExportLogs = buildTr(null, "Export logs", exportLogsButton);
    tbody.append(trExportLogs);

    function buildTr(classNameStr, labelText, element) {
        const tr = observerTable.createTr(classNameStr);
        tbody.append(tr);

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

    function initDefaultDynamicPlaceholderPreferences(checkbox, initTimeoutInput, nextLoopTimeoutInput, waitingTimeoutInput, writingTimeoutInput) {
        let observerDynamicFilter = new ObserverDynamicFilter()
        observerDynamicFilter.enabled = "true";
        checkbox.checked = observerDynamicFilter.enabled;
        localStorage.setItem("observer.dynamic.placeholder.enabled", observerDynamicFilter.enabled);

        initTimeoutInput.value = observerDynamicFilter.initTimeout;
        localStorage.setItem("observer.init.timeout.placeholder", observerDynamicFilter.initTimeout);

        nextLoopTimeoutInput.value = observerDynamicFilter.nextLoopTimeout;
        localStorage.setItem("observer.next.loop.timeout.placeholder", observerDynamicFilter.nextLoopTimeout);

        waitingTimeoutInput.value = observerDynamicFilter.waitingTimeout;
        localStorage.setItem("observer.waiting.timeout.placeholder", observerDynamicFilter.waitingTimeout);

        writingTimeoutInput.value = observerDynamicFilter.writingTimeout;
        localStorage.setItem("observer.writing.timeout.placeholder", observerDynamicFilter.writingTimeout);
    }

    function restoreValuesFromLocalStorageForDynamicPlaceholderPreferences(checkbox, initTimeoutInput, nextLoopTimeoutInput, waitingTimeoutInput, writingTimeoutInput) {
        checkbox.checked = localStorage.getItem("observer.dynamic.placeholder.enabled");
        initTimeoutInput.value = localStorage.getItem("observer.init.timeout.placeholder");
        nextLoopTimeoutInput.value = localStorage.getItem("observer.next.loop.timeout.placeholder");
        waitingTimeoutInput.value = localStorage.getItem("observer.waiting.timeout.placeholder");
        writingTimeoutInput.value = localStorage.getItem("observer.writing.timeout.placeholder");
    }

    return otherPreferencesDiv;
}

class ObserverDynamicFilter {

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value === "true";
    }

    get initTimeout() {
        return this._initTimeout ? this._initTimeout : "10";
    }

    set initTimeout(value) {
        this._initTimeout = this.buildValue(value, "10");
    }

    get nextLoopTimeout() {
        return this._nextLoopTimeout ? this._nextLoopTimeout : "5";
    }

    set nextLoopTimeout(value) {
        this._nextLoopTimeout = this.buildValue(value, "5");
    }

    get waitingTimeout() {
        return this._waitingTimeout ? this._waitingTimeout : "3";
    }

    set waitingTimeout(value) {
        this._waitingTimeout = this.buildValue(value, "3");
    }

    get writingTimeout() {
        return this._writingTimeout ? this._writingTimeout : "100";
    }

    set writingTimeout(value) {
        this._writingTimeout = this.buildValue(value, "100");
    }

    buildValue(value, defaultValue) {
        if (!value || Number(value) <= 0) {
            return String(Number(defaultValue));
        }
        return String(Number(value));
    }
}

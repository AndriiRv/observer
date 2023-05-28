class ObserverTable {

    createTable(className) {
        const table = document.createElement("table");
        if (className) {
            table.className = className;
        }
        return table;
    }

    createTHead(className) {
        const thead = document.createElement("thead");
        if (className) {
            thead.className = className;
        }
        return thead;
    }

    createTr(className) {
        const tr = document.createElement("tr");
        if (className) {
            tr.className = className;
        }
        return tr;
    }

    createTh(className, textContent) {
        const th = document.createElement("th");
        if (className) {
            th.className = className;
        }
        if (textContent) {
            th.textContent = textContent;
        }
        return th;
    }

    createTBody(className) {
        const tbody = document.createElement("tbody");
        if (className) {
            tbody.className = className;
        }
        return tbody;
    }

    createTd(className, textContent) {
        const td = document.createElement("td");
        if (className) {
            td.className = className;
        }
        if (textContent) {
            td.textContent = textContent;
        }
        return td;
    }
}

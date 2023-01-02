async function buildResources() {
    let resourceInTableDiv = document.createElement("div");
    resourceInTableDiv.className = "resources-in-table";

    let table = document.createElement("table");
    table.className = "table table-bordered table-hover resource-table";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    tr.append(buildTableHeader("ID"));
    tr.append(buildTableHeader("Name"));
    tr.append(buildTableHeader("URL"));
    tr.append(buildTableHeader(""));
    thead.append(tr);
    table.append(thead);

    let tbody = document.createElement("tbody");

    await buildResourcesToTableRow(tbody).then(r => {
        table.append(tbody);
        resourceInTableDiv.append(table);

        document.querySelector(".preferences").append(resourceInTableDiv);
    });
}

function buildTableHeader(textContent) {
    let th = document.createElement("th");
    th.textContent = textContent;
    return th;
}

function buildTableData(className, textContent) {
    let td = document.createElement("td");
    td.className = className;
    td.textContent = textContent;
    return td;
}

function buildTableDataWithCallback(className, callback) {
    let td = document.createElement("td");
    td.className = className;

    if (callback) {
        td.append(callback);
    }

    return td;
}

function buildAnchor(href) {
    let anchor = document.createElement("a");
    anchor.target = "_blank";
    anchor.href = href;
    anchor.textContent = href;
    return anchor;
}

function buildButton() {
    let button = document.createElement("button");
    button.className = "btn btn-primary";
    button.textContent = "Remove";
    return button;
}

async function buildResourcesToTableRow(tbody) {
    await fetch(indexPreferencesPage + "resources")
        .then(async response => {
            await response.json().then(function (json) {
                for (let resource of json.data) {
                    let tr = document.createElement("tr");
                    tr.className = "resource-js";

                    tr.append(buildTableData("resource-id-js", resource.id));
                    tr.append(buildTableData("resource-name-js", resource.name));
                    tr.append(buildTableDataWithCallback("resource-path-js", buildAnchor(resource.path)));
                    tr.append(buildTableDataWithCallback("resource-remove-js", buildButton()));

                    tbody.append(tr);
                }
            });
        });
}

async function buildResources() {
    let resourceInTableDiv = document.createElement("div");
    resourceInTableDiv.className = "resources-in-table";

    let importButtonElement = buildButton("btn btn-primary import-file-js", "Import");

    let inputSelectorElement = buildInput("file", "form-control input-selector-js");
    inputSelectorElement.accept = ".txt";
    inputSelectorElement.style.display = "none";

    let exportButtonElement = buildButton("btn btn-primary export-file-js", "Export");

    let table = document.createElement("table");
    table.className = "table table-bordered table-hover resource-table";

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    tr.append(buildTableHeader("ID"));
    tr.append(buildTableHeader("Name"));
    tr.append(buildTableHeader("URL"));

    let thContent = buildTableHeader("");
    thContent.append(importButtonElement, exportButtonElement, inputSelectorElement);

    tr.append(thContent);
    thead.append(tr);

    let tr2 = document.createElement("tr");
    tr2.append(document.createElement("th"));
    tr2.append(buildInputInHeader("form-control name-new-resource-js", "Name of resource"));
    tr2.append(buildInputInHeader("form-control path-new-resource-js", "Name of path"));
    tr2.append(buildTableHeaderWithCallback("save-new-resource-js", buildButton("btn btn-primary", "Save")));
    thead.append(tr2);

    table.append(thead);

    let tbody = document.createElement("tbody");

    await buildResourcesToTableRow(tbody).then(r => {
        table.append(tbody);
        resourceInTableDiv.append(table);

        document.querySelector(".preferences").append(resourceInTableDiv);
    });
}

function buildInputInHeader(classNameStr, placeHolderStr) {
    let th = document.createElement("th");

    let inputElement = document.createElement("input");
    inputElement.className = classNameStr;
    inputElement.placeholder = placeHolderStr;
    th.append(inputElement);

    return th
}

function buildTableHeaderWithCallback(className, callback) {
    let th = document.createElement("th");
    th.className = className;

    if (callback) {
        th.append(callback);
    }

    return th;
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

function buildButton(classNameStr, title) {
    let button = document.createElement("button");
    button.className = classNameStr;
    button.textContent = title;
    return button;
}

function buildInput(typeStr, classNameStr) {
    let input = document.createElement("input");
    input.type = typeStr;
    input.className = classNameStr;
    return input;
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
                    tr.append(buildTableDataWithCallback("resource-remove-js", buildButton("btn btn-primary", "Remove")));

                    tbody.append(tr);
                }
            });
        });
}

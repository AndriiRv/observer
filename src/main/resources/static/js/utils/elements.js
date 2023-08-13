
function buildDiv(classNameStr) {
    const div = document.createElement("div");
    if (classNameStr) {
        div.className = classNameStr;
    }
    return div;
}

function buildAnchor(href) {
    const anchor = document.createElement("a");
    anchor.target = "_blank";
    anchor.href = href;
    anchor.textContent = href;
    return anchor;
}

function buildButton(classNameStr, title) {
    const button = document.createElement("button");
    if (classNameStr) {
        button.className = classNameStr;
    }
    if (title) {
        button.textContent = title;
    }
    return button;
}

function buildInput(typeStr, classNameStr, placeHolderStr) {
    const input = document.createElement("input");
    if (typeStr) {
        input.type = typeStr;
    }
    if (classNameStr) {
        input.className = classNameStr;
    }
    if (placeHolderStr) {
        input.placeholder = placeHolderStr;
    }
    return input;
}

function buildInputFile(typeStr, classNameStr, placeHolderStr, acceptTypeFileStr) {
    const inputFile = buildInput(typeStr, classNameStr, placeHolderStr);
    inputFile.accept = "." + acceptTypeFileStr;
    inputFile.style.display = "none";
    return inputFile;
}

function buildCheckbox(classNameStr) {
    return buildInput("checkbox", classNameStr, null);
}

function buildNumberInput(classNameStr, placeHolderStr, min, max) {
    const number = buildInput("number", classNameStr, placeHolderStr);
    if (min) {
        number.min = min;
    }
    if (max) {
        number.max = max;
    }
    return number;
}

function buildSpan(classNameStr, text, withPlaceHolder) {
    const span = document.createElement("span");
    if (classNameStr) {
        span.className = classNameStr;
    }
    if (text) {
        span.textContent = text;
    }
    if (withPlaceHolder) {
        span.title = text;
    }
    return span;
}

function buildSelect(classNameStr, optionTitles, optionValues) {
    if ((optionTitles && !optionValues) || (!optionTitles && optionValues)) {
        throw new Error("Option titles should be with option values.");
    }

    if (optionTitles.length !== optionValues.length) {
        throw new Error("Option titles count should match option values count.");
    }

    const select = document.createElement("select");
    if (classNameStr) {
        select.className = classNameStr;
    }

    for (let i = 0; i < optionTitles.length; i++) {
        const option = document.createElement("option");
        option.value = optionValues[i];
        option.title = optionTitles[i];
        option.innerText = optionTitles[i];
        select.append(option);
    }
    return select;
}


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

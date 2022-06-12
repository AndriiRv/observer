
function buildLoader(element) {
    let loaderElement = document.createElement("div");
    loaderElement.className = "loader";

    element.append(loaderElement);
}

function removeLoader() {
    let loaderElement = document.querySelector(".loader");
    if (loaderElement) {
        loaderElement.remove();
    }
}

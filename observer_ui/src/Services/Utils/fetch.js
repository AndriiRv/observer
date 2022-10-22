
function getAjaxRequest(url, callback) {
    fetchAjaxWithoutBody(url, "GET", callback);
}

function postAjaxRequest(url, callback) {
    fetchAjaxWithoutBody(url, "POST", callback);
}

/**
 *
 *
 * @param {String} url
 * @param {String} body
 */
function putAjaxRequestWithBody(url, body, callback) {
    fetchAjaxWithBody(url, "PUT", body, callback);
}

/**
 *
 *
 * @param {String} url
 */
function putAjaxRequest(url, callback) {
    fetchAjaxWithoutBody(url, "PUT", callback);
}

function deleteAjaxRequest(url, callback) {
    fetchAjaxWithoutBody(url, "DELETE", callback);
}

/**
 *
 *
 * @param url
 * @param methodStr
 */
function fetchAjaxWithoutBody(url, methodStr, callback) {
    fetch(url, {
        method: methodStr,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
        .then(function (response) {
            console.log(response);

            if (callback) {
                callback();
            }
        })
        .catch(function (error) {
            alert("Server error");
            console.log(error);
        });
}

function fetchAjaxWithBody(url, methodStr, bodyValueAsJson, callback) {
    fetch(url, {
        method: methodStr,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: bodyValueAsJson
    })
        .then(function (response) {
            console.log(response);

            if (callback) {
                callback();
            }
        })
        .catch(function (error) {
            alert("Server error");
            console.log(error);
        });
}

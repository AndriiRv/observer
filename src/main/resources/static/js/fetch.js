function getAjaxRequest(url, callback) {
    fetchAjaxWithoutBody(url, "GET", callback);
}

function postAjaxRequest(url, callback) {
    fetchAjaxWithoutBody(url, "POST", callback);
}

/**
 *
 * @param {String} url
 * @param {String} body
 * @param callback
 * @param errorCallback
 */
function postAjaxRequestWithBody(url, body, callback, errorCallback) {
    fetchAjaxWithBody(url, "POST", body, callback, errorCallback);
}

/**
 *
 *
 * @param {String} url
 * @param {String} body
 * @param callback
 * @param errorCallback
 */
function putAjaxRequestWithBody(url, body, callback, errorCallback) {
    fetchAjaxWithBody(url, "PUT", body, callback, errorCallback);
}

/**
 *
 * @param {String} url
 * @param callback
 * @param errorCallback
 */
function putAjaxRequest(url, callback, errorCallback) {
    fetchAjaxWithoutBody(url, "PUT", callback, errorCallback);
}

function deleteAjaxRequest(url, callback) {
    fetchAjaxWithoutBody(url, "DELETE", callback);
}

/**
 *
 * @param url
 * @param methodStr
 * @param callback
 * @param errorCallback
 */
function fetchAjaxWithoutBody(url, methodStr, callback, errorCallback) {
    fetch(url, {
        method: methodStr,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
        .then(function (response) {
            console.log(response);

            if (response.ok) {
                if (callback) {
                    callback();
                }
            } else {
                response.json().then(function (json) {
                    if (errorCallback) {
                        errorCallback(json.message);
                    }
                });
            }
        })
        .catch(function (error) {
            alert("Server error");
            console.log(error);
        });
}

function fetchAjaxWithBody(url, methodStr, bodyValueAsJson, callback, errorCallback) {
    fetch(url, {
        method: methodStr,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: bodyValueAsJson
    })
        .then(function (response) {
            console.log(response);

            if (response.ok) {
                if (callback) {
                    callback();
                }
            } else {
                response.json().then(function (json) {
                    if (errorCallback) {
                        errorCallback(json.message);
                    }
                });
            }
        })
        .catch(function (error) {
            alert("Server error");
            console.log(error);
        });
}

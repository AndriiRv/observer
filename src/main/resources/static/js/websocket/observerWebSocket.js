
class ObserverWebSocket {

    constructor(socketUrl, messageUrl, sendToUrl) {
        this._socketUrl = socketUrl;
        this._messageUrl = messageUrl;
        this._sendToUrl = sendToUrl;
        this._stompClient = null;
    }

    initConnect() {
        const socket = new SockJS(this._socketUrl);
        this._stompClient = Stomp.over(socket);

        const webSocketObj = this;
        this._stompClient.connect({}, function () {
            this.subscribe(webSocketObj._sendToUrl, function (messageOutput) {
                const obj = JSON.parse(messageOutput.body).body.data;
                document.dispatchEvent(new CustomEvent("buildStatus", {
                    detail: obj
                }));
            });
        });
    }

    disconnect() {
        if (this._stompClient != null) {
            this._stompClient.disconnect();
        }
    }

    sendRequest(passedRequestDtoObj) {
        this._stompClient.send(this._messageUrl, {}, JSON.stringify(passedRequestDtoObj));
    }
}

class ObserverDynamicFilter {

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value === "true";
    }

    /**
     * Timeout before start after page loaded in seconds.
     *
     * @returns {*|string}
     */
    get initTimeout() {
        return this._initTimeout ? this._initTimeout : "10";
    }

    set initTimeout(value) {
        this._initTimeout = this.buildValue(value, "10");
    }

    /**
     * Timeout before start a next placeholders iteration after ending the previous one in seconds.
     *
     * @returns {*|string}
     */
    get nextLoopTimeout() {
        return this._nextLoopTimeout ? this._nextLoopTimeout : "5";
    }

    set nextLoopTimeout(value) {
        this._nextLoopTimeout = this.buildValue(value, "5");
    }

    /**
     * Timeout before render next placeholder of current iteration in seconds.
     *
     * @returns {*|string}
     */
    get waitingTimeout() {
        return this._waitingTimeout ? this._waitingTimeout : "3";
    }

    set waitingTimeout(value) {
        this._waitingTimeout = this.buildValue(value, "3");
    }

    /**
     * Render placeholder velocity in milliseconds.
     *
     * @returns {*|string}
     */
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

class ObserverSelect {

    defaultStatuses = ["[inactive]", "[active]", "[issues are exists]"]

    /**
     *
     *
     * @param {String} classNameSelect
     * @param {Array<String>} optionTitles
     * @param {Array<String>} optionValues
     */
    constructor(classNameSelect, optionTitles, optionValues) {
        this._classNameSelect = classNameSelect;

        if (!optionTitles && !optionValues) {
            optionTitles = this.defaultStatuses;
            optionValues = this.defaultStatuses;
        }

        this._optionTitles = optionTitles;
        this._optionValues = optionValues;
    }

    buildSelect() {
        return buildSelect(this._classNameSelect, this._optionTitles, this._optionValues);
    }
}

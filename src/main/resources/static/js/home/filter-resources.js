
class ObserverFilters {

    /**
     * Initialize ObserverFilters with array of {@link ObserverFilter}.
     *
     * @param {ObserverFilter[]} observerFilters
     */
    constructor(observerFilters) {
        this._observerFilters = observerFilters;
    }

    init() {
        const observerFilters = this._observerFilters;
        for (const observerFilter of observerFilters) {
            const filterElement = observerFilter.filterElement;

            addEvent(filterElement, this.buildEventTitle(filterElement), function (e) {
                filterElements(observerFilters);
            });
        }

        /**
         * Main logic of filters elements.
         *
         * @param {ObserverFilter[]} observerFilters
         */
        function filterElements(observerFilters) {
            let observerElementRows = observerFilters[0].filterElement.closest("table").querySelectorAll(".observer-element-row");
            showAllElements(observerElementRows);

            for (let row of observerElementRows) {
                if (isFilteredValueNotMatched(row, observerFilters)) {
                    row.style.display = "none";
                }
            }

            /**
             * Check is selected filtered value not match to observer elements.
             *
             * @param row
             * @param {ObserverFilter[]} observerFilters
             * @returns {boolean}
             */
            function isFilteredValueNotMatched(row, observerFilters) {
                for (const observerFilter of observerFilters) {
                    const elementDom = row.querySelector(observerFilter.comparableSelectorStr);
                    const elementValue = elementDom ? elementDom.textContent : "";
                    if (!elementValue.toLowerCase().includes(observerFilter.filterElement.value.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            }

            /**
             * Show all elements on the DOM.
             *
             * @param elements
             */
            function showAllElements(elements) {
                elements.forEach(element => element.style.display = "revert");
            }
        }
    }

    /**
     * Build event title by {@link Element}.
     *
     * @param {Element} filterElement
     * @returns {string}
     */
    buildEventTitle(filterElement) {
        let eventTitle;
        if (filterElement.tagName.toLowerCase().includes("input")) {
            eventTitle = "input";
        } else if (filterElement.tagName.toLowerCase().includes("select")) {
            eventTitle = "change";
        }
        return eventTitle;
    }
}

class ObserverFilter {

    /**
     * Initialize ObserverFilter
     *
     * @param {Element} filterElement
     * @param {String} comparableSelectorStr
     */
    constructor(filterElement, comparableSelectorStr) {
        this._filterElement = filterElement;
        this._comparableSelectorStr = comparableSelectorStr;
    }

    get filterElement() {
        return this._filterElement;
    }

    set filterElement(value) {
        this._filterElement = value;
    }

    get comparableSelectorStr() {
        return this._comparableSelectorStr;
    }

    set comparableSelectorStr(value) {
        this._comparableSelectorStr = value;
    }
}

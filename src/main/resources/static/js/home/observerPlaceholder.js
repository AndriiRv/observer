
function observerDynamicElementPlaceholder(element, placeholders) {
    const checkboxValue = localStorage.getItem("observer.dynamic.placeholder.enabled");
    if (!checkboxValue || checkboxValue === "false") {
        return;
    }

    const initPlaceHolder = element.placeholder + " ";
    let initTimeout = localStorage.getItem("observer.init.timeout.placeholder") + "000";
    let loopTimeout = localStorage.getItem("observer.next.loop.timeout.placeholder") + "000";
    let waitingTimeout = localStorage.getItem("observer.waiting.timeout.placeholder") + "000";
    let writingCharVelocityTimeout = localStorage.getItem("observer.writing.timeout.placeholder");

    let timeoutVar = null;
    timeoutVar = setTimeout(function () {
        initDynamicPlaceholder();
    }, initTimeout);

    async function initDynamicPlaceholder() {
        for (const placeholder of placeholders) {
            element.placeholder = element.placeholder + " ";

            for (const placeholderChar of placeholder) {
                await sleep(writingCharVelocityTimeout).then(() => {
                    element.placeholder += placeholderChar;
                });
            }
            await sleep(waitingTimeout).then(() => {
                element.placeholder = initPlaceHolder;
            });
        }
        clearTimeout(timeoutVar);
        timeoutVar = setTimeout(initDynamicPlaceholder, loopTimeout);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
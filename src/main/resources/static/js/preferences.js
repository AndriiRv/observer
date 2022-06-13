let indexPreferencesPage = getCurrentBrowserUrl();

document.addEventListener('DOMContentLoaded', function () {
    let resources = document.querySelectorAll(".resource-js");
    for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];
        let resourceId = resource.children[0].textContent;
        addEvent(resource, "click", function () {
            // addResource
            removeResource(resourceId);
        });
    }

    function removeResource(id) {
        if (confirm('Are you sure you want to remove resource ' + id + " ?")) {
            fetch(indexPreferencesPage + "resources/" + id, {
                method: "DELETE",
            })
            document.location.href = indexPreferencesPage;
        }
    }
});
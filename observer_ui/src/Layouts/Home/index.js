import React from "react";

import {addLoader, removeLoader} from "./loader";
import {addEvent} from "../../Services/Utils/utils";
import Resource from "./resource";

import "../../Assets/Styles/index.css";
import "../../Assets/Styles/loader.css";
import {filterResources} from "./filter-resources";

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            resources: []
        };
    }

    componentDidMount() {
        this.initResources();

        let filterInputElement = document.querySelector(".filter-resources-js");
        let resources = this.state.resources;
        addEvent(filterInputElement, "input", function () {
            filterResources(filterInputElement, resources);
        });
    }

    render() {
        let body = document.querySelector("body");
        body.style.padding = "0px";
        body.style.margin = "0px";

        const {error, resources} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!resources || resources.length === 0) {
            return <div>Loading...</div>;
        } else {
            return (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {resources.map(resource => (
                        <div key={resource.id} className={resource._className + " " + "resource" + resource._id} style={resource._style}>
                            <input className="resourceId" hidden value={resource._id} readOnly/>
                            <div className="info-resource">
                                <span>{resource._nameResource}</span>
                                <a href={resource._urlResource} target="_blank">{resource._urlResource}</a>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }

    initResources() {
        let response = this.getCountOfResources();
        response.then(response => {
            if (response.data) {
                let countOfResources = response.data;
                for (let i = 0; i < countOfResources; i++) {
                    let resourceElement = new Resource(i + 1, "resource-element gray", {height: "calc(50vh - 2px)"})
                    this.state.resources.push(resourceElement);

                    addLoader(resourceElement);
                    this.setState({
                        resources: this.state.resources
                    });

                    this.buildResource(this, resourceElement, i);
                }
            }
        });
    }

    getCountOfResources() {
        return fetch("http://localhost:8999/observer/resources/count")
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }

    /**
     *
     *
     * @param {Resource} childDiv
     * @param i
     * @returns {Promise<void>}
     */
    async buildResource(that, childDiv, i) {
        await fetch("http://localhost:8999/observer/resources/" + ++i)
            .then(response => {
                response.json().then(function (json) {
                    let resource = json.data;

                    addEvent(document.querySelector(".resource" + i), "click", function () {
                        that.getResource(resource.id, childDiv);
                    });

                    childDiv._style = {height: json.length <= 2 ? "calc(100vh - 2px)" : "calc(50vh - 2px)"};

                    let resourceStatus = resource.status.toLowerCase();
                    childDiv._className = "resource-element " + (resourceStatus === undefined || resourceStatus == null ? "gray" : resourceStatus);

                    that.buildInfoResource(childDiv, resource);
                    removeLoader(childDiv);

                    that.setState({
                        resources: that.state.resources
                    });
                });
            });
    }

    buildInfoResource(childDiv, resource) {
        childDiv._nameResource = resource.name;
        childDiv._urlResource = resource.path;
        return childDiv;
    }

    /**
     *
     *
     * @param id
     * @param {Resource} childDiv
     */
    getResource(id, childDiv) {
        addLoader(childDiv);
        this.setState({
            resources: this.state.resources
        });

        this.buildResourceResult(this, id, childDiv);
    }

    buildResourceResult(that, id, childDiv) {
        fetch("http://localhost:8999/observer/resources/" + id)
            .then(response => {
                response.json().then(function (json) {
                    childDiv._className = "resource-element " + json.data.status.toLowerCase();
                    removeLoader(childDiv);

                    that.setState({
                        resources: that.state.resources
                    });
                });
            });
    }
}

export default HomePage;

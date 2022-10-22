import React from 'react';

import "../../Assets/Styles/preferences.css";

class PreferencePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            resources: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8999/observer/preferences/resources", {
            method: "GET",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        resources: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        // let body = document.querySelector("body");
        // body.style.overflow = "hidden";

        const {error, resources} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!resources) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="resources-in-table">
                    <table className="table table-bordered table-hover resource-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>URL</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {resources.map(resource => (
                            <tr className="resource-js">
                                <td key={resource.id} className="resource-id-js">{resource.id}</td>
                                <td className="resource-name-js">{resource.name}</td>
                                <td className="resource-path-js">
                                    <a href={resource.path} target="_blank">{resource.path}</a>
                                </td>
                                <td className="resource-remove-js">
                                    <button className="btn btn-primary">Remove</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default PreferencePage;

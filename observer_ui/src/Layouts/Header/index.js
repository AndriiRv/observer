import {Link} from "react-router-dom";
import React from "react";

import "../../Assets/Styles/header.css";

let applicationVersion = "0.0.3";

function Header() {
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                <div className="logo-and-title">
                    <Link className="navbar-brand" to="/">
                        <img className="logo" src="favicon.svg" alt="Logo"/>
                        <span className="name-of-application">Observer</span>
                    </Link>
                    <span className="version">Version: <span>{applicationVersion}</span></span>
                </div>

                <div className="buttons-and-search">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <input className="form-control mr-sm-2 filter-resources-js" type="search"
                                   placeholder="Search"
                                   aria-label="Search"/>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/preferences">Preferences</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header;

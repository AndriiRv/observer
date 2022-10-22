import React from "react"

// We will create these two pages in a moment
import HomePage from "../../Layouts/Home";
import PreferencePage from "../../Layouts/Preferences";

import {Route, Routes} from "react-router";
import Header from "../../Layouts/Header";

function ObserverRouter() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/preferences" element={<PreferencePage/>}/>
            </Routes>
        </div>
    )
}

export default ObserverRouter;

import React from "react";
import "./App.scss";
import {Header} from "../header";
import meteors from "../../assets/meteors.json";
import MeteorsSearcher from "../../utils/MeteorsSearcher";

const App = () => {
    console.log(new MeteorsSearcher(meteors));
    return (
        <div className="app">
            <Header title="MeteorsQuerist"
                    subtitle="meteors are falling as we speak" />
        </div>
    );
};

export default App;

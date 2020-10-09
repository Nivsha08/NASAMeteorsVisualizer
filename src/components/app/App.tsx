import React, {useEffect, useState} from "react";
import "./App.scss";
import mockDataset from "../../assets/meteors.json";
import {Header} from "../header";
import {QueryManager} from "../queryManager";
import {MeteorProperties} from "../../types/meteors";

const fetchDataset = async () => mockDataset;

const App = () => {
    const [dataset, setDataset] = useState<MeteorProperties[]>([]);

    useEffect(() => {
        const setApplicationDataset = async () => {
            const data: MeteorProperties[] = await fetchDataset();
            setDataset(data);
        };
        setApplicationDataset();
    }, []);
    
    return (
        <div className="app">
            <Header title="MeteorsQuerist"
                    subtitle="meteors are falling as we speak" />
            <QueryManager dataset={dataset} />
        </div>
    );
};

export default App;

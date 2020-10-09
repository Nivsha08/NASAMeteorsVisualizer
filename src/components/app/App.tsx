import React, {useEffect, useState} from "react";
import "./App.scss";
import mockDataset from "../../assets/meteors.json";
import {Header} from "../header";
import {QueryManager} from "../queryManager";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../utils/MeteorsSearcher";

const fetchDataset = async () => mockDataset;

const App = () => {
    const [dataset, setDataset] = useState<MeteorProperties[]>([]);
    const [searcher, setSearcher] = useState<MeteorsSearcher | null>(null);

    useEffect(() => {
        const setApplicationDataset = async () => {
            const data: MeteorProperties[] = await fetchDataset();
            setDataset(data);
            setSearcher(new MeteorsSearcher(data));
        };
        setApplicationDataset();
    }, []);

    return (
        <div className="app">
            <Header title="MeteorsQuerist"
                    subtitle="meteors are falling as we speak" />
            {searcher ?
                <QueryManager dataset={dataset}
                              searcher={searcher as MeteorsSearcher}
                              updateSearcher={setSearcher}  />
                : null}
        </div>
    );
};

export default App;

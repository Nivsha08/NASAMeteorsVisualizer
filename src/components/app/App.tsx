import React, {useEffect, useState} from "react";
import "./App.scss";
import mockDataset from "../../assets/meteors.json";
import {Header} from "../header";
import {QueryManager} from "../queryManager";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../utils/MeteorsSearcher";
import {FallingMeteors} from "../fallingMeteors";

const fetchDataset = async () => mockDataset;

const App = () => {
    const [dataset, setDataset] = useState<MeteorProperties[]>([]);
    const [searcher, setSearcher] = useState<MeteorsSearcher | null>(null);
    const [queryKey, setQueryKey] = useState<number>(0);

    useEffect(() => {
        const setApplicationDataset = async () => {
            const data: MeteorProperties[] = await fetchDataset();
            setDataset(data);
            setSearcher(new MeteorsSearcher(data));
        };
        setApplicationDataset();
    }, []);

    const updateQueryKey = () => {
        setQueryKey(queryKey + 1);
    };

    console.log(searcher)

    return (
        <div className="app">
            <Header title="MeteorsQuerist"
                    subtitle="meteors are falling as we speak"/>
            {
                searcher ?
                    <>
                        <QueryManager dataset={dataset}
                                      searcher={searcher as MeteorsSearcher}
                                      updateSearcher={setSearcher}
                                      onQuery={updateQueryKey}
                                      queryKey={queryKey}/>
                        <FallingMeteors amount={searcher.result.length}
                                        key={queryKey}/>
                    </>
                    : null
            }
        </div>
    );
};

export default App;

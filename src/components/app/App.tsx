import React, {useEffect, useState} from "react";
import "./App.scss";
import mockDataset from "../../assets/meteors.json";
import {Header} from "../header";
import {QueryManager} from "../queryManager";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../models/MeteorsSearcher";
import {FallingMeteors} from "../fallingMeteors";
import {Map} from "../map";

const fetchDataset = async () => mockDataset;

const App = () => {
    const [dataset, setDataset] = useState<MeteorProperties[]>([]);
    const [searcher, setSearcher] = useState<MeteorsSearcher | null>(null);
    const [queryKey, setQueryKey] = useState<number>(0);
    const [detailsView, showDetails] = useState<boolean>(false);
    const [mapExpanded, setMapExpansion] = useState<boolean>(false);

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

    const toggleDetailsView = () => {
        showDetails(!detailsView);
        setMapExpansion(!mapExpanded);
    };

    return (
        <div className="app">
            <div className="header-row">
                <Header title="MeteorsQuerist"
                        subtitle="meteors are falling as we speak"/>
            </div>
            {
                searcher ?
                    <div className="query-row">
                        <QueryManager dataset={dataset}
                                      searcher={searcher as MeteorsSearcher}
                                      updateSearcher={setSearcher}
                                      updateQueryKey={updateQueryKey}
                                      detailsVisible={detailsView}
                                      toggleDetails={toggleDetailsView}
                                      queryKey={queryKey}/>
                        <Map expanded={mapExpanded}
                             closeMap={toggleDetailsView}
                             meteors={searcher.result.meteors} />
                        <FallingMeteors/>
                    </div>
                    : null
            }
        </div>
    );
};

export default App;

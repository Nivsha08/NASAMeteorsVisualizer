import React, {useState} from "react";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../utils/MeteorsSearcher";
import {YearSelector} from "../yearSelector";

interface QueryManagerProps {
    dataset: MeteorProperties[];
    searcher: MeteorsSearcher;
    updateSearcher: (newSearcher: MeteorsSearcher) => void;
}

const QueryManager = (props: QueryManagerProps) => {
    const [year, setYear] = useState<number>(1000);
    const [mass, setMass] = useState<string>("");

    const handleYearSelection = (): void => {
        // todo: filter by year
        console.log("filter by year:", year);
    };

    return (
        <>
            <YearSelector value={year} setValue={setYear}
                          onProceed={handleYearSelection}
                          minYear={props.searcher.minYear}
                          maxYear={props.searcher.maxYear}/>
            <span style={{color: "white", fontSize: "4rem"}}>{props.searcher.result.length}</span>
        </>
    )
};

export default QueryManager;

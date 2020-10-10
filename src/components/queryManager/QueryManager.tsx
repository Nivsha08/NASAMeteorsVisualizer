import React, {useEffect, useState} from "react";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../utils/MeteorsSearcher";
import {YearSelector} from "../yearSelector";
import {ResultSummary} from "../resultSummary";

interface QueryManagerProps {
    dataset: MeteorProperties[];
    searcher: MeteorsSearcher;
    updateSearcher: (newSearcher: MeteorsSearcher) => void;
}

const QueryManager = (props: QueryManagerProps) => {

    const [queryKey, setQueryKey] = useState<number>(0);
    const [year, setYear] = useState<number>(1000);
    const [mass, setMass] = useState<string>("");

    const handleYearSelection = (): void => {
        // todo: filter by year
        console.log("filter by ", year);
        props.searcher.reset();
        props.searcher.filterByYear(year);
        setQueryKey(queryKey + 1);
    };

    return (
        <>
            <YearSelector value={year} setValue={setYear}
                          onProceed={handleYearSelection}
                          minYear={props.searcher.minYear}
                          maxYear={props.searcher.maxYear}/>
            <ResultSummary meteors={props.searcher.result} key={queryKey} />
        </>
    )
};

export default QueryManager;

import React, {useState} from "react";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../utils/MeteorsSearcher";
import {YearSelector} from "../yearSelector";
import {ResultSummary} from "../resultSummary";
import {MassSelector} from "../massSelector";

interface QueryManagerProps {
    dataset: MeteorProperties[];
    searcher: MeteorsSearcher;
    updateSearcher: (newSearcher: MeteorsSearcher) => void;
    queryKey: number;
    onQuery: () => void;
}

const QueryManager = (props: QueryManagerProps) => {

    const [year, setYear] = useState<number>(1000);
    const [mass, setMass] = useState<number>(0);

    const updateQuery = (): void => {
        props.searcher.reset();
        props.searcher.filterByYear(year).filterByMinimalMass(mass);
        console.log("filter by ", `year: ${year}`, `mass: ${mass}`, `result:`, props.searcher.result);
        props.onQuery();
    };

    return (
        <>
            <YearSelector value={year} setValue={setYear}
                          onProceed={updateQuery}
                          minYear={props.searcher.minYear}
                          maxYear={props.searcher.maxYear} />
            <MassSelector value={mass} setValue={setMass}
                          onProceed={updateQuery} />
            <ResultSummary meteors={props.searcher.result} key={props.queryKey} />
        </>
    )
};

export default QueryManager;

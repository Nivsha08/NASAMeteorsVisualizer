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
}

const QueryManager = (props: QueryManagerProps) => {

    const [queryKey, setQueryKey] = useState<number>(0);
    const [year, setYear] = useState<number>(1000);
    const [mass, setMass] = useState<number>(0);

    const updateQuery = (): void => {
        console.log("filter by ", `year: ${year}`, `mass: ${mass}`);
        props.searcher.reset();
        props.searcher.filterByYear(year).filterByMinimalMass(mass);
        setQueryKey(queryKey + 1);
    };

    return (
        <>
            <YearSelector value={year} setValue={setYear}
                          onProceed={updateQuery}
                          minYear={props.searcher.minYear}
                          maxYear={props.searcher.maxYear} />
            <MassSelector value={mass} setValue={setMass}
                          onProceed={updateQuery} />
            <ResultSummary meteors={props.searcher.result} key={queryKey} />
        </>
    )
};

export default QueryManager;

import React, {useState} from "react";
import "./QueryManager.scss";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../models/MeteorsSearcher";
import {YearSelector} from "../yearSelector";
import {ResultSummary} from "../resultSummary";
import {MassSelector} from "../massSelector";
import {Button, notification} from "antd";

interface QueryManagerProps {
    dataset: MeteorProperties[];
    searcher: MeteorsSearcher;
    updateSearcher: (newSearcher: MeteorsSearcher) => void;
    queryKey: number;
    toggleDetails: () => void;
    detailsVisible: boolean;
    onQuery: () => void;
}

enum NotificationTypes {
    SUCCESS = "success",
    WARNING = "warning",
    INFO = "info",
    ERROR = "error"
}

const QueryManager = (props: QueryManagerProps) => {

    const [year, setYear] = useState<number>(props.searcher.minYear);
    const [mass, setMass] = useState<number>(0);
    const [summaryVisible, showSummary] = useState<boolean>(false);

    const notify = (message: string, type: NotificationTypes): void => {
        notification[type]({message, placement: "bottomLeft", className: "notification"})
    };

    const updateQuery = (): void => {
        props.searcher.reset();
        props.searcher.filterByYear(year).filterByMinimalMass(mass);
        showSummary(true);
        props.onQuery();
        if (props.searcher.error) {
            notify(props.searcher.error.message, NotificationTypes.INFO);
        }
    };

    const resetQuery = (): void => {
        props.searcher.reset();
        setYear(0);
        setMass(0);
        showSummary(false);
        props.onQuery();
    };

    return (
        <div className="query-manager-wrapper">
            <YearSelector value={year} setValue={setYear}
                          minYear={props.searcher.minYear}
                          maxYear={props.searcher.maxYear}/>
            <MassSelector value={mass} setValue={setMass}
                          maxMass={props.searcher.maxMass}/>
            <div className="buttons-wrapper">
                <Button className="apply-button" size={"large"} type={"ghost"}
                        onClick={updateQuery}>Apply query</Button>
                <Button className="reset-button" size={"large"} type={"ghost"}
                        onClick={resetQuery}>Reset</Button>
            </div>
            {
                summaryVisible ?
                    <ResultSummary meteors={props.searcher.result.meteors}
                                   detailsVisible={props.detailsVisible}
                                   toggleDetails={props.toggleDetails}
                                   key={props.queryKey}/>
                    : null
            }
        </div>
    )
};

export default QueryManager;

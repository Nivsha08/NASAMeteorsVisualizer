import React, {useState} from "react";
import "./QueryManager.scss";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../utils/MeteorsSearcher";
import {YearSelector} from "../yearSelector";
import {ResultSummary} from "../resultSummary";
import {MassSelector} from "../massSelector";
import {Button, notification} from "antd";
import {getMessage} from "../../constants/messages";

interface QueryManagerProps {
    dataset: MeteorProperties[];
    searcher: MeteorsSearcher;
    updateSearcher: (newSearcher: MeteorsSearcher) => void;
    queryKey: number;
    onQuery: () => void;
}

enum NotificationTypes {
    SUCCESS = "success",
    WARNING = "warning",
    INFO = "info",
    ERROR = "error"
}

const QueryManager = (props: QueryManagerProps) => {

    const [year, setYear] = useState<number>(0);
    const [mass, setMass] = useState<number>(0);
    const [summaryVisible, showSummary] = useState<boolean>(false);

    const notify = (message: string, type: NotificationTypes): void => {
        notification[type]({message, placement: "bottomLeft", className: "notification"})
    };

    const checkForMaxMass = (): boolean => {
        if (mass >= props.searcher.maxMass) {
            notify(getMessage.MAX_MASS(props.searcher.maxMass), NotificationTypes.WARNING);
            return true;
        }
        return false;
    };

    const checkForEmptyYear = (): boolean => {
        if (props.searcher.emptyResult && mass === 0) {
            notify(getMessage.EMPTY_YEAR(), NotificationTypes.INFO);
            return true;
        }
        return false;
    };

    const checkForNoResults = (): boolean => {
        if (props.searcher.emptyResult) {
            notify(getMessage.NO_RESULTS(), NotificationTypes.INFO);
            return true;
        }
        return false;
    };

    const validateQueryResults = (): boolean => {
        if (checkForEmptyYear()) return false;
        else if (checkForMaxMass()) return false;
        else if (checkForNoResults()) {
            // todo: trigger fallback logic
            console.log("jump to first year!");
            return false;
        }
        return true;
    };

    const updateQuery = (): void => {
        props.searcher.reset();
        props.searcher.filterByYear(year).filterByMinimalMass(mass);
        validateQueryResults();
        showSummary(true);
        props.onQuery();
    };

    const resetQuery = (): void => {
        props.searcher.reset();
        setYear(0);
        setMass(0);
        showSummary(false);
        props.onQuery();
    };

    return (
        <>
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
                    <ResultSummary meteors={props.searcher.result} key={props.queryKey}/>
                    : null
            }
        </>
    )
};

export default QueryManager;

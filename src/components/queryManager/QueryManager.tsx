import React, {useState} from "react";
import "./QueryManager.scss";
import {MeteorProperties} from "../../types/meteors";
import MeteorsSearcher from "../../utils/MeteorsSearcher";
import {YearSelector} from "../yearSelector";
import {ResultSummary} from "../resultSummary";
import {MassSelector} from "../massSelector";
import {PromptMessage} from "../promptMessage";
import {Button} from "antd";

interface QueryManagerProps {
    dataset: MeteorProperties[];
    searcher: MeteorsSearcher;
    updateSearcher: (newSearcher: MeteorsSearcher) => void;
    queryKey: number;
    onQuery: () => void;
}

interface MessageProps {
    visible: boolean;
    type?: "success" | "warning" | "error" | "info";
    text?: string;
}

const QueryManager = (props: QueryManagerProps) => {

    const [year, setYear] = useState<number>(0);
    const [mass, setMass] = useState<number>(0);
    const [summaryVisible, showSummary] = useState<boolean>(false);
    const [message, setMessage] = useState<MessageProps>({visible: false});

    const MAX_MASS_MSG = `There's no meteor with mass larger than ${props.searcher.maxMass} - just try a smaller number!`;
    const EMPTY_YEAR_MSG = "No meteors landed during this year";
    const NO_RESULTS_MSG = "The mass was not found, jumping to first-year where there is a mass that fits the criteria";

    const notify = (message: string, type: "success" | "warning" | "error" | "info" = "warning"): void => {
        setMessage({visible: true, type: type, text: message});
    };

    const checkForMaxMass = (): boolean => {
        if (mass >= props.searcher.maxMass) {
            notify(MAX_MASS_MSG);
            return true;
        }
        return false;
    };

    const checkForEmptyYear = (): boolean => {
        if (props.searcher.emptyResult && mass === 0) {
            notify(EMPTY_YEAR_MSG, "info");
            return true;
        }
        return false;
    };

    const checkForNoResults = (): boolean => {
        if (props.searcher.emptyResult) {
            notify(NO_RESULTS_MSG, "info");
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
        setMessage({visible: false});
        props.searcher.reset();
        props.searcher.filterByYear(year).filterByMinimalMass(mass);
        validateQueryResults();
        showSummary(true);
        props.onQuery();
    };

    const resetQuery = (): void => {
        setMessage({visible: false});
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
                <Button className="reset-button" size={"large"} type={"ghost"}
                        onClick={resetQuery}>Reset</Button>
                <Button className="apply-button" size={"large"} type={"ghost"}
                        onClick={updateQuery}>Apply query</Button>
            </div>
            {
                summaryVisible ?
                    <ResultSummary meteors={props.searcher.result} key={props.queryKey}/>
                    : null
            }
            <PromptMessage visible={message.visible}
                           message={message.text}
                           type={message.type}
                           onClose={() => setMessage({visible: false})}/>
        </>
    )
};

export default QueryManager;

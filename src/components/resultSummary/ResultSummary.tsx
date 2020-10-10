import React from "react";
import Meteor from "../../models/Meteor";
import "./ResultSummary.scss";

interface ResultSummaryProps {
    meteors: Meteor[];
}

const ResultSummary = (props: ResultSummaryProps) => {

    return (
        <div className="amount-summary">
            {/*<span>Meteors fits the criteria: </span>*/}
            {props.meteors.length}
        </div>
    );
};

export default ResultSummary;

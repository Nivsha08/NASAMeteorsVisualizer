import React from "react";
import Meteor from "../../models/Meteor";
import "./ResultSummary.scss";

interface ResultSummaryProps {
    meteors: Meteor[];
}

const ResultSummary = (props: ResultSummaryProps) => {

    return (
        <>
            <div className="amount-summary">{props.meteors.length}</div>
            <span className="bottom-summary">meteors fit the criteria</span>
        </>

    );
};

export default ResultSummary;

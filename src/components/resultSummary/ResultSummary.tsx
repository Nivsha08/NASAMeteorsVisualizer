import React from "react";
import Meteor from "../../models/Meteor";
import "./ResultSummary.scss";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

interface ResultSummaryProps {
    meteors: Meteor[];
}

const ResultSummary = (props: ResultSummaryProps) => {

    return (
        <div className="result-summary">
            <div className="amount-summary">{props.meteors.length}</div>
            <span className="bottom-summary">meteors fit the criteria</span>
            {
                (props.meteors.length > 0) ?
                    <Button className="details-button" type={"link"}>details <PlusOutlined /></Button>
                    : null
            }
        </div>
    );
};

export default ResultSummary;

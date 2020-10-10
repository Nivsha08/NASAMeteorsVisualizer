import React from "react";
import Meteor from "../../models/Meteor";
import "./ResultSummary.scss";
import {Button} from "antd";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";

interface ResultSummaryProps {
    meteors: Meteor[];
    detailsVisible: boolean;
    toggleDetails: () => void;
}

const ResultSummary = (props: ResultSummaryProps) => {

    return (
        <div className="result-summary">
            <div className="amount-summary">{props.meteors.length}</div>
            <span className="bottom-summary">meteors fit the criteria</span>
            {
                (props.meteors.length > 0) ?
                    <Button onClick={props.toggleDetails} className="details-button" type={"link"}>
                        details {props.detailsVisible ? <MinusOutlined /> : <PlusOutlined />}
                    </Button>
                    : null
            }
        </div>
    );
};

export default ResultSummary;

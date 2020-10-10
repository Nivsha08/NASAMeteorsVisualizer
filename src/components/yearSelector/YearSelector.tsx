import React from "react";
import "./YearSelector.scss";
import {InputNumber, Slider} from "antd";

interface YearSelectorProps {
    value: number;
    setValue: (value: number) => void;
    minYear: number;
    maxYear: number;
}

const style = {color: "#ffffff", opacity: .5};

const YearSelector = (props: YearSelectorProps) => {

    const sliderMarks = {
        [props.minYear]: {style, label: props.minYear},
        1000: {style, label: "1000"},
        1500: {style, label: "1500"},
        1700: {style, label: "1700"},
        1900: {style, label: "1900"},
        [props.maxYear]: {style, label: props.maxYear}
    };

    const handleValue = (value: number): void => {
        if (value) props.setValue(value);
        else props.setValue(props.minYear);
    };

    return (
        <div className="year-selector-wrapper">
            <span className="instruction">Start by choosing a year</span>
            <Slider value={props.value}
                    min={props.minYear}
                    max={props.maxYear}
                    tooltipVisible={false}
                    marks={sliderMarks}
                    onChange={(e: number) => props.setValue(e)} />
            <div className="input-wrapper">
                <InputNumber className="year-input"
                             size={"large"}
                             min={props.minYear}
                             max={props.maxYear}
                             placeholder={"CHOOSE YEAR TO INVESTIGATE"}
                             value={props.value}
                             onChange={e => handleValue(e as number)}/>
            </div>
        </div>
    )
};

export default YearSelector;

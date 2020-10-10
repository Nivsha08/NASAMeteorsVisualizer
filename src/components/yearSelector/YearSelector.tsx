import React from "react";
import "./YearSelector.scss";
import {Button, Input, Slider} from "antd";
import {ScheduleTwoTone, ArrowRightOutlined} from "@ant-design/icons"

interface YearSelectorProps {
    value: number;
    setValue: (value: number) => void;
    minYear: number;
    maxYear: number;
    onProceed: () => void;
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

    const handleValue = (value: string): void => {
        if (value) props.setValue(Number.parseInt(value));
        else props.setValue(props.minYear);
    };

    return (
        <div className="year-selector-wrapper">
            <span className="instruction">Start by choosing a year</span>
            <Slider value={props.value}
                    min={props.minYear}
                    max={props.maxYear}
                    marks={sliderMarks}
                    onChange={(e: number) => props.setValue(e)}
                    onAfterChange={props.onProceed}/>
            <div className="input-wrapper">
                <Input className="year-input"
                       type={"number"}
                       size={"large"}
                       allowClear
                       prefix={<ScheduleTwoTone/>}
                       min={props.minYear}
                       max={props.maxYear}
                       value={props.value}
                       onChange={e => handleValue(e.target.value)}
                       onPressEnter={props.onProceed}/>
                <Button className="proceed-button"
                        type={"text"}
                        size={"large"}
                        onClick={props.onProceed}>
                    {<ArrowRightOutlined/>}
                </Button>
            </div>

        </div>
    )
};

export default YearSelector;

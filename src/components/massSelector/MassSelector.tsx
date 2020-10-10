import React from "react";
import "./MassSelector.scss";
import {Button, InputNumber} from "antd";

interface MassSelectorProps {
    value: number;
    setValue: (value: number) => void;
    maxMass: number;
    onProceed: () => void;
}

const MassSelector = (props: MassSelectorProps) => {

    const handleValue = (value: number): void => {
        if (value) props.setValue(value);
        else props.setValue(0);
    };

    return (
        <div className="mass-selector-wrapper">
            <span className={"instruction"}>Go on and choose a minimal meteor mass, max mass: {props.maxMass}</span>
            <div className="input-wrapper">
                <InputNumber className={"mass-input"}
                             type={"text"}
                             min={0}
                             max={props.maxMass}
                             placeholder={"CHOOSE MINIMAL MASS"}
                             size={"large"}
                             onChange={e => handleValue(e as number)}
                             onPressEnter={props.onProceed}/>
                <Button className="proceed-button"
                        type={"text"}
                        size={"large"}
                        onClick={props.onProceed}>
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default MassSelector;

import React from "react";
import "./MassSelector.scss";
import {InputNumber} from "antd";

interface MassSelectorProps {
    value: number;
    setValue: (value: number) => void;
    maxMass: number;
}

const MassSelector = (props: MassSelectorProps) => {

    const handleValue = (value: number): void => {
        if (value) props.setValue(value);
        else props.setValue(0);
    };

    return (
        <div className="mass-selector-wrapper">
            <span className={"instruction"}>Go on and choose a minimal meteor mass</span>
            <div className="input-wrapper">
                <InputNumber className={"mass-input"}
                             value={props.value}
                             min={0}
                             max={props.maxMass}
                             placeholder={"CHOOSE MINIMAL MASS"}
                             size={"large"}
                             onChange={e => handleValue(e as number)}/>
            </div>
        </div>
    );
};

export default MassSelector;

import React from "react";
import "./MassSelector.scss";
import {Button, InputNumber} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";

interface MassSelectorProps {
    value: number;
    setValue: (value: number) => void;
    onProceed: () => void;
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
                             type={"text"}
                             min={0}
                             placeholder={"CHOOSE MINIMAL MASS"}
                             size={"large"}
                             onChange={e => handleValue(e as number)}
                             onPressEnter={props.onProceed} />
                <Button className="proceed-button"
                        type={"text"}
                        size={"large"}
                        onClick={props.onProceed}>
                    {<ArrowRightOutlined/>}
                </Button>
            </div>
        </div>
    );
};

export default MassSelector;

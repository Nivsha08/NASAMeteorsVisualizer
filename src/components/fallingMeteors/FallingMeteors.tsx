import React from "react";
import "./FallingMeteors.scss";

interface FallingMeteorsProps {
    amount: number;
}

const FallingMeteors = (props: FallingMeteorsProps) => {
    const multiplyFactor = 3;
    const indicesArray = Array.from({length: props.amount * multiplyFactor}, (_, i) => i);
    return (
        <div className="falling-meteors-wrapper">
            {
                indicesArray.map((i: number) => (
                    <i className={`meteor meteor-${i}`} key={i} />
                ))
            }
        </div>
    );
};

export default FallingMeteors;

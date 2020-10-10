import React from "react";
import "./FallingMeteors.scss";

const FallingMeteors = () => {
    const MAX_METEORS = 15;
    const indicesArray = Array.from({length: MAX_METEORS}, (_, i) => i);
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

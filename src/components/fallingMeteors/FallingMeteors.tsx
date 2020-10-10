import React from "react";
import "./FallingMeteors.scss";
import Meteor from "../../models/Meteor";

interface FallingMeteorsProps {
    meteors: Meteor[];
}

const FallingMeteors = (props: FallingMeteorsProps) => {

    return (
        <div className="falling-meteors-wrapper">
            {
                props.meteors.map((m: Meteor, i: number) => (
                    <i className={`meteor meteor-${i}`} key={i} />
                ))
            }
        </div>
    );
};

export default FallingMeteors;

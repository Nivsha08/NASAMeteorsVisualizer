import React from "react";
import "./Map.scss";

interface MapProps {
    expanded: boolean;
}

const Map = (props: MapProps) => {
    return (
        <div className={`map-wrapper ${props.expanded ? "visible" : "dismissed"}`}>
            <span style={{color: "white"}}
                  className={`test-text ${props.expanded ? "visible" : "dismissed"}`}>map view!</span>
            </div>
    );
};

export default Map;

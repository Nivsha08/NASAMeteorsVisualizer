import React, {useState} from "react";
import {MeteorProperties} from "../../types/meteors";

interface Props {
    dataset: MeteorProperties[];
}

const QueryManager = (props: Props) => {
    const [year, setYear] = useState<number>(0);
    const [mass, setMass] = useState<number>(0);
    return (
        <div>{year}</div>
    )
};

export default QueryManager;

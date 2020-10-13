import React from "react";
import "./Map.scss";
import {Map as LeafletMap, TileLayer} from "react-leaflet";
import {Drawer} from "antd"
import Meteor from "../../models/Meteor";
import {MeteorMarker} from "../meteorMarker";

interface MapProps {
    expanded: boolean;
    closeMap: () => void;
    meteors: Meteor[];
}

const panelBodyStyle = {padding: 0, margin: 0};
const tiles = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png";

const Map = (props: MapProps) => {
    return (
        <Drawer title={`${props.meteors.length} meteors fit the criteria - these are they locations`}
                placement={"bottom"}
                bodyStyle={panelBodyStyle}
                height={550}
                closable
                destroyOnClose
                onClose={props.closeMap}
                visible={props.expanded}>
            <LeafletMap center={[8, 0]} zoom={2}>
                <TileLayer url={tiles}/>
                {
                    props.meteors.map(
                        (m: Meteor, i: number) => <MeteorMarker meteor={m} key={i} />
                    )
                }
            </LeafletMap>
        </Drawer>
    );
};

export default Map;

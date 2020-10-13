import React from "react";
import "./MeteorMarker.scss";
import Meteor from "../../models/Meteor";
import {LatLng, MeteorLocation} from "../../types/meteors";
import {LatLngExpression} from "leaflet";
import {Marker, Popup} from "react-leaflet";

interface MeteorMarkerProps {
    meteor: Meteor
}

const latLngToArray = (coordinates: LatLng): LatLngExpression => {
    return [coordinates.lat as number, coordinates.lng as number];
};

const numberFormatter = Intl.NumberFormat("en-US");

const MeteorMarker = (props: MeteorMarkerProps) => {
    return (
        <Marker position={latLngToArray((props.meteor.location as MeteorLocation).coordinates)}>
            <Popup>
                <div className="marker-content">
                    <span>Name: <strong>{props.meteor.name}</strong></span>
                    <span>Mass: <strong>{numberFormatter.format(props.meteor.mass as number)} kg</strong></span>
                </div>
            </Popup>
        </Marker>
    );
};

export default MeteorMarker;

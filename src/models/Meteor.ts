import {Latitude, Longitude, MeteorGeolocation, MeteorProperties, Recognizer} from "../types/meteors";

class Meteor {

    name: string;
    mass: string | number;
    fall: string;
    year: string;
    metadata: {
        id: string;
        nametype: string;
    };
    recognizer: Recognizer;
    location?: {
        type: string;
        coordinates: [Latitude, Longitude];
    };

    constructor(props: MeteorProperties) {
        this.name = props.name;
        this.mass = props.mass;
        this.fall = props.fall;
        this.year = props.year;
        if (props.geolocation) {
            this.location = {
                type: props.geolocation.type,
                coordinates: props.geolocation.coordinates
            };
        }
        this.metadata = {
            id: props.id,
            nametype: props.nametype
        };
        this.recognizer = {
            class: props.recclass,
            coordinates: [props.reclat, props.reclong]
        };
    }

}

export default Meteor;

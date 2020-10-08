import {MeteorLocation, MeteorMetadata, MeteorProperties, Recognizer} from "../types/meteors";

class Meteor {

    name?: string;
    mass?: string | number;
    fall?: string;
    year?: string;
    location: null | MeteorLocation;
    recognizer: Recognizer;
    metadata: null | MeteorMetadata;

    constructor(props: MeteorProperties) {
        this.name = props.name;
        this.mass = props.mass;
        this.fall = props.fall;
        this.year = props.year;
        this.metadata = this.parseMetadata(props);
        this.location = this.parseLocation(props);
        this.recognizer = this.parseRecognizer(props);
    }

    isLocationKnown(): boolean {
        return (!this.location?.coordinates.lat || !this.location?.coordinates.lng);
    }

    private parseMetadata(props: MeteorProperties): MeteorMetadata {
        return {
            id: (props.id) ? props.id : null,
            nametype: (props.nametype) ? props.nametype : null
        }
    }

    private parseLocation(props: MeteorProperties): null | MeteorLocation {
        return (!props.geolocation) ? null :
            {
                type: props.geolocation.type,
                coordinates: {
                    lat: props.geolocation.coordinates[0],
                    lng: props.geolocation.coordinates[1]
                }
            };
    }

    private parseRecognizer(props: MeteorProperties): Recognizer {
        return {
            class: props.recclass ? props.recclass : null,
            coordinates: {
                lat: (props.reclat) ? props.reclat : null,
                lng: (props.reclong) ? props.reclong : null
            }
        }
    }
}

export default Meteor;

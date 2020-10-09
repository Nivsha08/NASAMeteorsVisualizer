import {MeteorLocation, MeteorMetadata, MeteorProperties, Recognizer} from "../types/meteors";
import DateUtils from "../utils/DateUtils";

class Meteor {

    name: null | string;
    mass: null | string | number;
    fall: null | string;
    year: null | number;
    location: null | MeteorLocation;
    recognizer: Recognizer;
    metadata: null | MeteorMetadata;

    constructor(props: MeteorProperties) {
        this.name = (props.name) ? props.name : null;
        this.mass = (props.mass) ? props.mass : null;
        this.fall = (props.fall) ? props.fall : null;
        this.year = (props.year) ? this.parseYear(props.year) : null;
        this.metadata = this.parseMetadata(props);
        this.location = this.parseLocation(props);
        this.recognizer = this.parseRecognizer(props);
    }

    knownLocation(): boolean {
        return (this.location?.coordinates.lat != null && this.location?.coordinates.lng != null);
    }

    knownYear(): boolean {
        return (this.year != null);
    }

    knownMass(): boolean {
        return (this.mass != null);
    }

    isValid(): boolean {
        return (this.knownLocation() && this.knownYear() && this.knownMass());
    }

    private parseYear(date: string): number {
        return DateUtils.get(DateUtils.parse(date), "year");
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

export type Latitude = number | string;
export type Longitude = number | string;

export interface Recognizer {
    class: string;
    coordinates: [Latitude, Longitude];
}

export interface MeteorGeolocation {
    type: string;
    coordinates: [Latitude, Longitude];
}

export interface MeteorProperties {
    name: string;
    id: string;
    nametype: string;
    recclass: string;
    mass: string | number;
    fall: string;
    year: string;
    reclat: Latitude;
    reclong: Longitude;
    geolocation?: MeteorGeolocation;
}

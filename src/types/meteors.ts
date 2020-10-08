export type Coordinate = null | number | string;

export interface LatLng {
    lat: Coordinate,
    lng: Coordinate
}

export interface Recognizer {
    class?: null | string;
    coordinates?: LatLng;
}

export interface MeteorGeolocation {
    type: string;
    coordinates: Coordinate[];
}

export interface MeteorLocation {
    type: string;
    coordinates: LatLng;
}

export interface MeteorMetadata {
    id: null | string;
    nametype: null | string;
}

export interface MeteorProperties {
    name?: string;
    id?: string;
    nametype?: string;
    recclass?: string;
    mass?: string | number;
    fall?: string;
    year?: string;
    reclat?: Coordinate;
    reclong?: Coordinate;
    geolocation?: MeteorGeolocation;

    [name: string]: any;
}

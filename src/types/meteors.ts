type Latitude = number;
type Longitude = number;

export interface MeteorGeolocation {
    type: "Point";
    coordinates: [Latitude, Longitude];
}

export interface Meteor {
    name: string;
    id: string;
    nametype: "Valid" | "Invalid";
    recclass: string;
    mass: string | number;
    fall: "Fell" | "Found";
    year: string;
    reclat: Latitude;
    reclong: Longitude;
    geolocation: MeteorGeolocation;
}

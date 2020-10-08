import {MeteorProperties} from "../types/meteors";
import Meteor from "../models/Meteor";

class MeteorsSearcher {

    private readonly meteors: Meteor[];

    constructor(data: MeteorProperties[]) {
        this.meteors = data.map(
            (item: MeteorProperties): Meteor => new Meteor(item)
        );
    }

    filterByYear(year: string | number): Meteor[] {
        return [];
    }

}

export default MeteorsSearcher;

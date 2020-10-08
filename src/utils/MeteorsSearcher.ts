import {MeteorProperties} from "../types/meteors";
import Meteor from "../models/Meteor";

class MeteorsSearcher {

    private readonly meteors: Meteor[];

    constructor(data: MeteorProperties[]) {
        this.meteors = data.map(
            (item: MeteorProperties): Meteor => new Meteor(item)
        );
        console.log(this.meteors);
    }

}

export default MeteorsSearcher;

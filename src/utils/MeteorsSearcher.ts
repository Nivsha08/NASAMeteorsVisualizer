import {MeteorProperties} from "../types/meteors";
import Meteor from "../models/Meteor";

class MeteorsSearcher {

    private readonly meteors: Meteor[];

    constructor(data: MeteorProperties[]) {
        this.meteors = data.map(
            (item: MeteorProperties): Meteor => {
                console.log(item);
                return new Meteor(item);
            }
        );
    }

}

export default MeteorsSearcher;

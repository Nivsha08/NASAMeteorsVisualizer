import {MeteorProperties} from "../types/meteors";
import Meteor from "../models/Meteor";
import ArrayUtils from "./ArrayUtils";

class MeteorsSearcher {

    private readonly initialMeteors: Meteor[];
    private meteors: Meteor[];

    constructor(data: MeteorProperties[] | Meteor[]) {
        const parsedData: Meteor[] = this.parseData(data);
        this.initialMeteors = ArrayUtils.sortBy(parsedData, "year");
        this.meteors = ArrayUtils.clone(this.initialMeteors);
    }

    private parseData(data: MeteorProperties[] | Meteor[]): Meteor[] {
        if (data.length === 0) {
            return [];
        }
        else if (data[0] instanceof Meteor) {
            return data as Meteor[];
        }
        else {
            return (data as MeteorProperties[])
                .map((item: MeteorProperties): Meteor => new Meteor(item));
        }
    }

    filterByYear(year: string | number): MeteorsSearcher {
        const requiredYear: number =
            (typeof year === "string") ? Number.parseInt(year) : year;
        this.meteors = this.meteors
            .filter((m: Meteor) => m.knownYear())
            .filter((m: Meteor) => m.year as number === requiredYear);
        return this;
    }

    filterByMinimalMass(mass: string | number): MeteorsSearcher {
        const requiredMass: number =
            (typeof mass === "string") ? Number.parseInt(mass) : mass;
        this.meteors = this.meteors
            .filter((m: Meteor) => m.knownMass())
            .filter((m: Meteor) => m.mass as number > requiredMass);
        return this;
    }

    

    result(): Meteor[] {
        return this.meteors;
    }

    reset(): void {
        this.meteors = this.initialMeteors;
    }

}

export default MeteorsSearcher;

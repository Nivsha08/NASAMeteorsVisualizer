import {MeteorProperties} from "../types/meteors";
import Meteor from "../models/Meteor";
import ArrayUtils from "./ArrayUtils";

class MeteorsSearcher {

    private readonly initialMeteors: Meteor[];
    private meteors: Meteor[];

    constructor(data: MeteorProperties[] | Meteor[]) {
        const parsedData: Meteor[] = this.parseData(data);
        const validMeteors: Meteor[] = this.removeInvalidMeteors(parsedData);
        this.initialMeteors = ArrayUtils.sortBy(validMeteors, "year");
        this.meteors = ArrayUtils.clone(this.initialMeteors);
    }

    private parseData(data: MeteorProperties[] | Meteor[]): Meteor[] {
        if (data.length === 0) {
            return [];
        } else if (data[0] instanceof Meteor) {
            return data as Meteor[];
        } else {
            return (data as MeteorProperties[])
                .map((item: MeteorProperties): Meteor => new Meteor(item));
        }
    }

    private removeInvalidMeteors(data: Meteor[]): Meteor[] {
        return data.filter((m: Meteor) => m.isValid());
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

    // todo: implement no-results-fallback logic

    reset(): void {
        this.meteors = ArrayUtils.clone(this.initialMeteors);
    }

    get result(): Meteor[] {
        return this.meteors;
    }

    get emptyResult(): boolean {
        return (this.result.length === 0);
    }

    get minYear(): number {
        return ArrayUtils.findMin(this.initialMeteors.map(m => m.year as number));
    }

    get maxYear(): number {
        return ArrayUtils.findMax(this.initialMeteors.map(m => m.year as number));
    }

    get maxMass(): number {
        return ArrayUtils.findMax(this.initialMeteors.map(m => Number.parseInt(m.mass as string)));
    }
}

export default MeteorsSearcher;

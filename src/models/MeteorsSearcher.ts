import {MeteorProperties} from "../types/meteors";
import Meteor from "./Meteor";
import ArrayUtils from "../utils/ArrayUtils";
import QueryError, {MaxMassExceeded, NoMeteorsInThisYear} from "./QueryError";

interface QueryFilters {
    year: number;
    mass: number;
}

interface QueryResult {
    year: number;
    minimalMass: number;
    meteors: Meteor[];
}

class MeteorsSearcher {

    private readonly initialMeteors: Meteor[];
    private filters: QueryFilters;
    private meteors: Meteor[];
    error: QueryError | null = null;

    constructor(data: MeteorProperties[] | Meteor[]) {
        const parsedData: Meteor[] = this.parseData(data);
        const validMeteors: Meteor[] = this.removeInvalidMeteors(parsedData);
        this.initialMeteors = ArrayUtils.sortBy(validMeteors, "year");
        this.meteors = ArrayUtils.clone(this.initialMeteors);
        this.filters = this.getInitialFilters();
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

    private getInitialFilters(): QueryFilters {
        return {year: this.minYear, mass: 0};
    }

    filterByYear(year: string | number): MeteorsSearcher {
        this.filters.year = (typeof year === "string") ? Number.parseInt(year) : year;
        this.meteors = this.meteors
            .filter((m: Meteor) => m.knownYear())
            .filter((m: Meteor) => (m.year as number) === this.filters.year);
        if (this.meteors.length === 0) {
            this.error = new NoMeteorsInThisYear(this.filters.year);
        }
        return this;
    }

    filterByMinimalMass(mass: string | number): MeteorsSearcher {
        this.filters.mass = (typeof mass === "string") ? Number.parseInt(mass) : mass;
        this.meteors = this.meteors
            .filter((m: Meteor) => m.knownMass())
            .filter((m: Meteor) => (m.mass as number) > this.filters.mass);
        if (this.filters.mass >= this.maxMass) {
            this.error = new MaxMassExceeded(this.maxMass);
        }
        return this;
    }

    findBestResultsYear(minimalMass: number, year: number): number {
        this.reset();
        const sufficeMassMeteors: Meteor[] = this.filterByMinimalMass(minimalMass).result.meteors;
        const maxYear: number = ArrayUtils.findMax(
            sufficeMassMeteors
                .filter((m: Meteor) => (m.year as number) < year)
                .map((m: Meteor) => m.year as number)
        );
        this.filters.year = maxYear;
        this.meteors = sufficeMassMeteors.filter(
            (m: Meteor) => (m.year as number) === maxYear);
        return maxYear;
    }

    reset(): void {
        this.meteors = ArrayUtils.clone(this.initialMeteors);
        this.filters = this.getInitialFilters();
        this.error = null;
    }

    get result(): QueryResult {
        return {year: this.filters.year, minimalMass: this.filters.mass, meteors: this.meteors};
    }

    get emptyResult(): boolean {
        return (this.result.meteors.length === 0);
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

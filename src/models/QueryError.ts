abstract class QueryError extends Error {
    readonly name: string = "QueryError";
}

export class NoMeteorsInThisYear extends QueryError {
    readonly name: string = "NoMeteorsInThisYear";

    constructor(year: number) {
        super(`No meteors landed in ${year}. Try searching in a different year`);
    }
}

export class MaxMassExceeded extends QueryError {
    readonly name: string = "MaxMassExceeded";


    constructor(maxMass: number) {
        super(`There's no meteor with mass larger than ${maxMass} kg - just try a smaller number!`);
    }
}

export default QueryError;

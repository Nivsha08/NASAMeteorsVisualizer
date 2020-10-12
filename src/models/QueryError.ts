export enum QueryErrorType {
    NO_METEORS_IN_THIS_YEAR = "NoMeteorsInThisYear",
    NO_METEORS_FOUND = "NoMeteorsFound",
    MAX_MASS_EXCEEDED = "MaxMassExceeded"
}

export const QueryErrorMessages = {
    NO_RESULTS: () => (
        "The mass was not found, jumping to first-year where there is a mass that fits the criteria"
    ),
    EMPTY_YEAR: (year: number) => (
        `No meteors landed in ${year}. Try searching in a different year`
    ),
    MAX_MASS: (maxMass: number) => (
        `There's no meteor with mass larger than ${maxMass} kg - just try a smaller number!`
    )
};

abstract class QueryError extends Error {
    readonly name: string = "QueryError";
}

export class NoMeteorsInThisYear extends QueryError {
    readonly name: string = QueryErrorType.NO_METEORS_IN_THIS_YEAR;

    constructor(year: number) {
        super(QueryErrorMessages.EMPTY_YEAR(year));
    }
}

export class MaxMassExceeded extends QueryError {
    readonly name: string = QueryErrorType.MAX_MASS_EXCEEDED;


    constructor(maxMass: number) {
        super(QueryErrorMessages.MAX_MASS(maxMass));
    }
}

export default QueryError;

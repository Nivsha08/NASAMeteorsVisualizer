export const getMessage = {
    MAX_MASS: (maxMass: number) => (
        `There's no meteor with mass larger than ${maxMass} kg - just try a smaller number!`
    ),
    EMPTY_YEAR: () => (
        "No meteors landed during this year"
    ),
    NO_RESULTS: () => (
        "The mass was not found, jumping to first-year where there is a mass that fits the criteria"
    )
};

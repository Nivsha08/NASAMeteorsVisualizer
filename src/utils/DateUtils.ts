import moment, {Moment, unitOfTime} from "moment";

class DateParseError extends Error {
    readonly name: string = "DateParseError";
    constructor(message: string) {
        super(message);
    }
}

class DateOperationError extends Error {
    readonly name: string = "DateOperationError";
    constructor(message: string) {
        super(message);
    }
}

class DateUtils {

    static parse(date: string): Moment {
        try {
            return moment(date);
        }
        catch (error) {
            throw new DateParseError("Parse error: invalid date string given.");
        }
    }

    static get(date: Moment, property: unitOfTime.Base) {
        try {
            return date.get(property);
        }
        catch (error) {
            throw new DateOperationError(
                `Invalid operation: cannot get '${property}' out of the given date.`);
        }
    }

}

export default DateUtils;

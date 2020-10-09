import _ from "lodash";

class InvalidArrayError extends Error {
    readonly name: string = "InvalidArrayError";
}

class ArrayUtils {

    static clone<T> (arr: T[]): T[] {
        return _.cloneDeep(arr);
    }

    static sortBy<T> (arr: T[], property: keyof T): T[] {
        return _.sortBy(arr, property);
    }

    static findMin(arr: number[]): number {
        if (arr && arr.length > 0) {
            return _.min(arr) as number;
        }
        else {
            throw new InvalidArrayError("the array is empty or undefined.");
        }
    }

    static findMax(arr: number[]): number {
        if (arr && arr.length > 0) {
            return _.max(arr) as number;
        }
        else {
            throw new InvalidArrayError("the array is empty or undefined.");
        }
    }

}

export default ArrayUtils;

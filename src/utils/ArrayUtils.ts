import _ from "lodash";

class ArrayUtils {

    static clone<T> (arr: T[]): T[] {
        return _.cloneDeep(arr);
    }

    static sortBy<T> (arr: T[], property: keyof T): T[] {
        return _.sortBy(arr, property);
    }

}

export default ArrayUtils;

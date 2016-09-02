/**
 * Created by sebastianfuss on 02.09.16.
 */

export class PageScrollUtilService {

    /**
     * Util method to check whether a given variable is either undefined or null
     * @param variable
     * @returns {boolean} true the variable is undefined or null
     */
    public static isUndefinedOrNull(variable: any): boolean {
        return (typeof variable === 'undefined') || variable === undefined || variable === null;
    }
}

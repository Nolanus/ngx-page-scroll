/**
 * Created by sebastianfuss on 24.02.17.
 */

export class Util {
    // Some pre-calculated and approximated closeness epsilons
    public static ofByOne = -1 / 3;
    public static ofBy15 = -1.5;
    public static ofBy20 = -1.605;

    /**
     * Source for this magic function
     *
     * https://github.com/jasmine/jasmine/blob/master/src/core/matchers/toBeCloseTo.js
     *
     * http://www.wolframalpha.com/input/?i=the+inverse+function+of+(10%5Ex)%2F2+is
     *
     * @param custom epsilon
     * @returns {number} a parameter to be passed to jasmine's toBeCloseTo() matcher
     */
    public static ofBy(custom: number): number {
        return -Math.log(custom * 2) / 2.3025850929940455;
    }
}

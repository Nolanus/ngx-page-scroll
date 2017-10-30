export abstract class EasingLogic {
    /**
     * Examples may be found at https://github.com/gdsmith/jquery.easing/blob/master/jquery.easing.js
     * or http://gizma.com/easing/
     * @param t current time
     * @param b beginning value
     * @param c change In value
     * @param d duration
     */
    public abstract ease(t: number, b: number, c: number, d: number): number;
}

export declare type PageScrollTarget = HTMLElement | string;

export declare type PageScrollingViews = HTMLElement | Document | HTMLBodyElement | Node;

export class PageScrollConfig {

    /**
     * The number of milliseconds to wait till updating the scroll position again.
     * Small amounts may produce smoother animations but require more processing power.
     * @type {number}
     */
    public static _interval = 10;

    /**
     * The amount of pixels that need to be between the current scrollTop/scrollLeft position
     * and the target position the cause a scroll animation. In case distance is below
     * this threshold, an immediate jump will be performed.
     * Due to dpi or rounding irregularities in browsers floating point numbers for scrollTop/scrollLeft values
     * are possible, making a === comparison of current scrollTop or scrollLeft and target scrollPosition error-prone.
     * @type {number}
     */
    public static _minScrollDistance = 2;

    /**
     * Name of the default namespace.
     * @type {string}
     */
    public static _defaultNamespace = 'default';

    /**
     * Whether by default the scrolling should happen in vertical direction (by manipulating the scrollTop property)
     * (= true; default) or in horizontal direction (by manipulating the scrollLeft property) (= false
     * @type {boolean}
     */
    public static defaultIsVerticalScrolling = true;

    /**
     * How many console logs should be emitted. Also influenced by angular mode (dev or prod mode)
     * 0: No logs, neither in dev nor in prod mode
     * 1: Animation errors in dev mode, no logs in prod mode
     * 2: Animation errors in dev and prod mode
     * 5: Animation errors in dev and all scroll position values that get set; animation errors in prod mode
     * @type {number}
     */
    public static _logLevel = 1;

    /**
     * The duration how long a scrollTo animation should last by default.
     * May be overridden using the page-scroll-duration attribute on a single ngxPageScroll instance.
     * @type {number}
     */
    public static defaultDuration = 1250;

    /**
     * The distance in pixels above scroll target where the animation should stop. Setting a positive number results in
     * the scroll target being more in the middle of the screen, negative numbers will produce scrolling "too far"
     * @type {number}
     */
    public static defaultScrollOffset = 0;

    /**
     * Whether by default for inline scroll animations the advanced offset calculation should take place (true) or
     * not (false). Default is false.
     * The advanced offset calculation will traverse the DOM tree upwards, starting at the scrollTarget, until it finds
     * the scrollingView container element. Along the way the offset positions of the relative positioned
     * (position: relative) elements will be taken into account for calculating the target elements position.
     * @type {boolean}
     */
    public static defaultAdvancedInlineOffsetCalculation = false;

    /**
     * The events that are listened to on the body to decide whether a scroll animation has been interfered/interrupted by the user
     * @type {string[]}
     */
    public static _interruptEvents: string[] = ['mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup', 'touchmove'];

    /**
     * The keys that are considered to interrupt a scroll animation (mainly the arrow keys). All other key presses will not stop the
     * scroll animation.
     * @type {number[]}
     */
    public static _interruptKeys: number[] = [33, 34, 35, 36, 38, 40];

    /**
     * Whether a scroll animation should be interruptible by user interaction (true) or not (false). If the user performs an
     * interrupting event while a scroll animation takes place, the scroll animation stops.
     * @type {boolean}
     */
    public static defaultInterruptible = true;

    private static _easingLogic: EasingLogic = {
        ease: (t: number, b: number, c: number, d: number): number => {
            // Linear easing
            return c * t / d + b;
        }
    };

    // Getter and setter to avoid auto completion to suggest calling the method
    public static get defaultEasingLogic(): EasingLogic {
        return PageScrollConfig._easingLogic;
    }

    public static set defaultEasingLogic(easingLogic: EasingLogic) {
        PageScrollConfig._easingLogic = easingLogic;
    }

}

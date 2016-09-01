import {Injectable, isDevMode} from '@angular/core';
import {PageScrollConfig, IEasingFunction} from './ng2-page-scroll-config';
import {PageScrollInstance} from './ng2-page-scroll-instance';

@Injectable()
export class PageScrollService {

    private static runningInstances: PageScrollInstance[] = [];

    private static stopInternal(interrupted: boolean, pageScrollInstance: PageScrollInstance): boolean {
        let index: number = PageScrollService.runningInstances.indexOf(pageScrollInstance);
        if (index >= 0) {
            PageScrollService.runningInstances.splice(index, 1);
        }

        if (pageScrollInstance.interruptListenersAttached) {
            pageScrollInstance.detachInterruptListeners();
        }

        if (pageScrollInstance.timer) {
            clearInterval(pageScrollInstance.timer);
            pageScrollInstance.fireEvent(!interrupted);
            return true;
        }
        return false;
    }

    /**
     * Util method to check whether a given variable is either undefined or null
     * @param variable
     * @returns {boolean} true the variable is undefined or null
     */
    public static isUndefinedOrNull(variable: any): boolean {
        return (typeof variable === 'undefined') || variable === undefined || variable === null;
    }

    /**
     *
     * @param scrollTarget The HTMLElement to be scrolled to
     * @param scrollingViews The objects whose "offsetTop" property should be manipulated, resulting in the scroll animation
     * @param pageScrollOffset The offset to the top of the scrollTarget to be targeted as destination of the scroll animation
     * @param pageScrollInterruptible Whether the scroll animation should be interruptible by the user (true) of not (false)
     * @param pageScrollEasing Easing function to manipulate the scroll distance over time
     * @param pageScrollDuration The duration in milliseconds the animation should take
     */
    public static scrollView(scrollTarget: HTMLElement,
                             scrollingViews: any[] = null,
                             pageScrollOffset: number = null,
                             pageScrollInterruptible: boolean = null,
                             pageScrollEasing: IEasingFunction = null,
                             pageScrollDuration: number = null): void {
    }

    /**
     * Start a scroll animation. All properties of the animation are stored in the given {@link PageScrollInstance} object.
     *
     * This is the core functionality of the whole library.
     *
     * @param pageScrollInstance
     */
    public static start(pageScrollInstance: PageScrollInstance): void {
        // Stop all possibly running scroll animations in the same namespace
        PageScrollService.stopAll(pageScrollInstance.namespace);

        if (pageScrollInstance.scrollTopSources === null || pageScrollInstance.scrollTopSources.length === 0) {
            // No scrollingViews specified, thus we can't animate anything
            if (isDevMode()) {
                console.warn('No ScrollTopSource specified, this ng2-page-scroll does not know which DOM elements to scroll');
            }
            return;
        }

        if (pageScrollInstance.distanceToScroll === 0) {
            // We're at the final destination already, so stop
            if (isDevMode()) {
                console.log('No distance to scroll, as we\'re at the destination already');
            }
            return;
        }

        if (pageScrollInstance.duration <= PageScrollConfig._interval) {
            // We should go there directly, as our "animation" would have one big step
            // only anyway and this way we save the interval stuff
            if (isDevMode()) {
                console.log('Scroll duration shorter that interval length, jumping to target');
            }
            pageScrollInstance.setScrollTopPosition(pageScrollInstance.targetScrollTop);
            pageScrollInstance.fireEvent(true);
            return;
        }

        // Register the interrupt listeners if we want an interruptible scroll animation
        if (pageScrollInstance.interruptible ||
            (PageScrollService.isUndefinedOrNull(pageScrollInstance.interruptible) && PageScrollConfig.defaultInterruptible)) {
            pageScrollInstance.attachInterruptListeners();
        }

        // Let's get started, get the start time...
        pageScrollInstance.startTime = new Date().getTime();
        // .. and calculate the end time (when we need to finish at last)
        pageScrollInstance.endTime = pageScrollInstance.startTime + pageScrollInstance.duration;

        pageScrollInstance.timer = setInterval((_pageScrollInstance: PageScrollInstance) => {
            // Take the current time
            let currentTime: number = new Date().getTime();

            // Determine the new scroll position
            let newScrollTop: number;
            if (_pageScrollInstance.endTime <= currentTime) {
                // We're over the time already, so go the targetScrollTop (aka. destination)
                this.stopInternal(false, _pageScrollInstance);
                newScrollTop = _pageScrollInstance.targetScrollTop;
            } else {
                // Calculate the scrollTop position based on the current time using the easing function
                newScrollTop = _pageScrollInstance.easing(
                    currentTime - _pageScrollInstance.startTime,
                    _pageScrollInstance.startScrollTop,
                    _pageScrollInstance.distanceToScroll,
                    _pageScrollInstance.duration);
            }
            // Set the new scrollTop to all scrollTopSource elements
            _pageScrollInstance.setScrollTopPosition(newScrollTop);

        }, PageScrollConfig._interval, pageScrollInstance);

        // Register the instance as running one
        PageScrollService.runningInstances.push(pageScrollInstance);
    }

    /**
     * Stop all running scroll animations. Optionally limit to stop only the ones of specific namespace.
     *
     * @param namespace
     * @returns {boolean}
     */
    public static stopAll(namespace?: string): boolean {
        if (PageScrollService.runningInstances.length > 0) {

            let instancesToStop: PageScrollInstance[] = [];
            if (!PageScrollService.isUndefinedOrNull(namespace) && namespace.length > 0) {
                instancesToStop = PageScrollService.runningInstances.filter((pageScrollInstance: PageScrollInstance) => {
                    return pageScrollInstance.namespace === namespace;
                });
            } else {
                instancesToStop = PageScrollService.runningInstances;
            }

            if (instancesToStop.length > 0) {
                instancesToStop.forEach((pageScrollInstance: PageScrollInstance, index: number) => {
                    PageScrollService.stopInternal(true, pageScrollInstance);
                });
                return true;
            }
        }
        return false;
    }

    public static stop(pageScrollInstance: PageScrollInstance): boolean {
        return this.stopInternal(true, pageScrollInstance);
    }

    constructor() {
        let message = 'You shouldn\'t create instances of the ng2-page-scroll-service!';
        if (isDevMode()) {
            throw message;
        } else {
            console.error(message);
        }
    }
}

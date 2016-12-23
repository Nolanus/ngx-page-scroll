import {Injectable, isDevMode} from '@angular/core';

import {PageScrollConfig} from './ng2-page-scroll-config';
import {PageScrollInstance, InterruptReporter} from './ng2-page-scroll-instance';
import {PageScrollUtilService} from './ng2-page-scroll-util.service';

@Injectable()
export class PageScrollService {

    private static instanceCounter: number = 0;

    private runningInstances: PageScrollInstance[] = [];

    private onInterrupted: InterruptReporter = {
        report: (event: Event, pageScrollInstance: PageScrollInstance): void => {
            if (pageScrollInstance.interruptible &&
                (event.type !== 'keyup' || PageScrollConfig._interruptKeys.indexOf((<KeyboardEvent>event).keyCode) >= 0)) {
                this.stopAll(pageScrollInstance.namespace);
            }
        }
    };

    private stopInternal(interrupted: boolean, pageScrollInstance: PageScrollInstance): boolean {
        let index: number = this.runningInstances.indexOf(pageScrollInstance);
        if (index >= 0) {
            this.runningInstances.splice(index, 1);
        }

        if (pageScrollInstance.interruptListenersAttached) {
            pageScrollInstance.detachInterruptListeners();
        }

        if (pageScrollInstance.timer) {
            // Clear/Stop the timer
            clearInterval(pageScrollInstance.timer);
            // Clear the reference to this timer
            pageScrollInstance.timer = undefined;
            pageScrollInstance.fireEvent(!interrupted);
            return true;
        }
        return false;
    }

    /**
     * Start a scroll animation. All properties of the animation are stored in the given {@link PageScrollInstance} object.
     *
     * This is the core functionality of the whole library.
     *
     * @param pageScrollInstance
     */
    public start(pageScrollInstance: PageScrollInstance): void {
        // Stop all possibly running scroll animations in the same namespace
        this.stopAll(pageScrollInstance.namespace);

        if (pageScrollInstance.scrollingViews === null || pageScrollInstance.scrollingViews.length === 0) {
            // No scrollingViews specified, thus we can't animate anything
            if (isDevMode()) {
                console.warn('No scrollingViews specified, this ng2-page-scroll does not know which DOM elements to scroll');
            }
            return;
        }

        let startScrollPositionFound = false;

        // Get the start scroll position from the scrollingViews (e.g. if the user already scrolled down the content)
        pageScrollInstance.scrollingViews.forEach((scrollingView: any) => {
            if (PageScrollUtilService.isUndefinedOrNull(scrollingView)) {
                return;
            }
            // Get the scrollTop or scrollLeft value of the first scrollingView that returns a value for its "scrollTop"
            // or "scrollLeft" property that is not undefined and unequal to 0

            let scrollPosition = pageScrollInstance.getScrollPropertyValue(scrollingView);
            if (!startScrollPositionFound && scrollPosition) {
                // We found a scrollingView that does not have scrollTop or scrollLeft 0

                // Return the scroll position value, as this will be our startScrollPosition
                pageScrollInstance.startScrollPosition = scrollPosition;
                startScrollPositionFound = true;
            }
        });

        let pageScrollOffset = pageScrollInstance.getCurrentOffset();

        // Calculate the target position that the scroll animation should go to

        let scrollTargetPosition = pageScrollInstance.extractScrollTargetPosition();
        pageScrollInstance.targetScrollPosition = Math.round(
            (pageScrollInstance.verticalScrolling ? scrollTargetPosition.top : scrollTargetPosition.left) - pageScrollOffset);

        // Calculate the distance we need to go in total
        pageScrollInstance.distanceToScroll = pageScrollInstance.targetScrollPosition - pageScrollInstance.startScrollPosition;

        if (isNaN(pageScrollInstance.distanceToScroll)) {
            // We weren't able to find the target position, maybe the element does not exist?

            if (isDevMode()) {
                console.log('Scrolling not possible, as we can\'t find the specified target');
            }
            pageScrollInstance.fireEvent(false);
            return;
        }

        // We're at the final destination already
        // OR we need to scroll down but are already at the end
        // OR we need to scroll up but are at the top already
        let allReadyAtDestination = Math.abs(pageScrollInstance.distanceToScroll) < PageScrollConfig._minScrollDistance;

        // We should go there directly, as our "animation" would have one big step
        // only anyway and this way we save the interval stuff
        let tooShortInterval = pageScrollInstance.duration <= PageScrollConfig._interval;

        if (allReadyAtDestination || tooShortInterval) {
            if (isDevMode()) {
                if (allReadyAtDestination) {
                    console.log('Scrolling not possible, as we can\'t get any closer to the destination');
                } else {
                    console.log('Scroll duration shorter that interval length, jumping to target');
                }
            }
            pageScrollInstance.setScrollPosition(pageScrollInstance.targetScrollPosition);
            pageScrollInstance.fireEvent(true);
            return;
        }

        // Register the interrupt listeners if we want an interruptible scroll animation
        if (pageScrollInstance.interruptible ||
            (PageScrollUtilService.isUndefinedOrNull(pageScrollInstance.interruptible) && PageScrollConfig.defaultInterruptible)) {
            pageScrollInstance.attachInterruptListeners(this.onInterrupted);
        }

        // Let's get started, get the start time...
        pageScrollInstance.startTime = new Date().getTime();
        // .. and calculate the end time (when we need to finish at last)
        pageScrollInstance.endTime = pageScrollInstance.startTime + pageScrollInstance.duration;

        pageScrollInstance.timer = setInterval((_pageScrollInstance: PageScrollInstance) => {
            // Take the current time
            let currentTime: number = new Date().getTime();

            // Determine the new scroll position
            let newScrollPosition: number;
            let stopNow = false;
            if (_pageScrollInstance.endTime <= currentTime) {
                // We're over the time already, so go the targetScrollPosition (aka destination)
                newScrollPosition = _pageScrollInstance.targetScrollPosition;
                stopNow = true;
            } else {
                // Calculate the scroll position based on the current time using the easing function
                newScrollPosition = Math.round(_pageScrollInstance.easingLogic.ease(
                    currentTime - _pageScrollInstance.startTime,
                    _pageScrollInstance.startScrollPosition,
                    _pageScrollInstance.distanceToScroll,
                    _pageScrollInstance.duration));
            }
            // Set the new scrollPosition to all scrollingViews elements
            if (!_pageScrollInstance.setScrollPosition(newScrollPosition)) {
                // Setting the new scrollTop/scrollLeft value failed for all ScrollingViews
                // early stop the scroll animation to save resources
                stopNow = true;
            }

            // At the end do the internal stop maintenance and fire the pageScrollFinish event
            // (otherwise the event might arrive at "too early")
            if (stopNow) {
                this.stopInternal(false, _pageScrollInstance);
            }

        }, PageScrollConfig._interval, pageScrollInstance);

        // Register the instance as running one
        this.runningInstances.push(pageScrollInstance);
    }

    /**
     * Stop all running scroll animations. Optionally limit to stop only the ones of specific namespace.
     *
     * @param namespace
     * @returns {boolean}
     */
    public stopAll(namespace?: string): boolean {
        if (this.runningInstances.length > 0) {
            let stoppedSome = false;
            this.runningInstances.forEach((pageScrollInstance: PageScrollInstance, index: number) => {
                if (PageScrollUtilService.isUndefinedOrNull(namespace) || namespace.length === 0 ||
                    pageScrollInstance.namespace === namespace) {
                    stoppedSome = true;
                    this.stopInternal(true, pageScrollInstance);
                }
            });
            return stoppedSome;
        }
        return false;
    }

    public stop(pageScrollInstance: PageScrollInstance): boolean {
        return this.stopInternal(true, pageScrollInstance);
    }

    constructor() {
        if (PageScrollService.instanceCounter > 0 && isDevMode()) {
            console.warn('An instance of PageScrollService already exists, usually ' +
                'including one provider should be enough, so double check.');
        }
        PageScrollService.instanceCounter++;
    }
}


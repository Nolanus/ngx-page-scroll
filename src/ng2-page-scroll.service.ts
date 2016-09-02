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
            clearInterval(pageScrollInstance.timer);
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
            // FIXME Optimize that to only do one iteration over the array
            let instancesToStop: PageScrollInstance[] = [];
            if (!PageScrollUtilService.isUndefinedOrNull(namespace) && namespace.length > 0) {
                instancesToStop = this.runningInstances.filter((pageScrollInstance: PageScrollInstance) => {
                    return pageScrollInstance.namespace === namespace;
                });
            } else {
                instancesToStop = this.runningInstances;
            }

            if (instancesToStop.length > 0) {
                instancesToStop.forEach((pageScrollInstance: PageScrollInstance, index: number) => {
                    this.stopInternal(true, pageScrollInstance);
                });
                return true;
            }
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


import {Injectable, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {PageScrollManager} from './ng2-page-scroll-manager';
import {PageScrollConfig, IEasingFunction} from './ng2-page-scroll-config';
import {EventEmitter} from '@angular/core';

@Injectable()
export class PageScrollService {
    private body: HTMLBodyElement;
    private scrollTopSources: any[];

    private timer: any = null;
    private interruptListenersAttached: boolean = false;
    public pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

    private static isUndefinedOrNull(variable: any ): boolean {
        return (typeof variable === 'undefined') || variable === undefined || variable === null;
    }

    constructor(@Inject(DOCUMENT) private document: any) {
        this.body = document.body;
        this.scrollTopSources = [this.document.documentElement, this.body, this.document.body.parentNode];
    }


    public stopInternal(interrupted: boolean): boolean {
        PageScrollManager.remove(this);

        if (this.interruptListenersAttached) {
            PageScrollManager.detachInterfereListeners(this.body);
            this.interruptListenersAttached = false;
        }

        if (this.timer) {
            clearInterval(this.timer);
            this.pageScrollFinish.emit(!interrupted);
            return true;
        }
        return false;
    }
    public scrollView(anchor: string,
                      scrollTopSources: any[] = null,
                      pageScrollOffset: number = null,
                      pageScrollInterruptible: boolean = null,
                      pageScrollEasing: IEasingFunction = null,
                      pageScrollDuration: number = null): void {
        // Stop all possibly running scroll animations
        PageScrollManager.stopAll();

        let anchorTarget: HTMLElement = document.getElementById(anchor.substr(1));

        if (anchorTarget === null) {
            // Target not found, so stop
            return;
        }
        pageScrollOffset =
            (PageScrollService.isUndefinedOrNull(pageScrollOffset) ? PageScrollConfig.defaultScrollOffset : pageScrollOffset);


        if (scrollTopSources !== null) {
            this.scrollTopSources = scrollTopSources;
            pageScrollOffset = pageScrollOffset + (scrollTopSources[0] as HTMLElement).offsetTop;
        }

        let targetScrollTop: number = anchorTarget.offsetTop - pageScrollOffset;
        let startScrollTop: number =
            scrollTopSources.reduce((previousValue: any, currentValue: any) => {
                // Get the scrolltop value of the first scrollTopSource that returns a value for its "scrollTop" property
                // that is not undefined and unequal to 0
                return previousValue ? previousValue : (currentValue && currentValue.scrollTop);
            }, undefined);

        let distanceToScroll: number = targetScrollTop - startScrollTop;
        if (distanceToScroll === 0) {
            // We're at the final destination already, so stop
            return;
        }
        let startTime: number = new Date().getTime();

        let intervalConf: any = {
            startScrollTop: startScrollTop,
            targetScrollTop: targetScrollTop,
            distanceToScroll: distanceToScroll,
            startTime: startTime,
            easing: pageScrollEasing === null ? PageScrollConfig.defaultEasingFunction : pageScrollEasing
        };
        intervalConf.duration =
            pageScrollDuration === null ? PageScrollConfig.defaultDuration : pageScrollDuration;
        intervalConf.endTime = intervalConf.startTime + intervalConf.duration;

        if (intervalConf.duration <= PageScrollConfig._interval) {
            // We should go there directly, as our "animation" would have one big step
            // only anyway and this way we save the interval stuff
            // this.body.scrollTop = intervalConf.targetScrollTop;
            this.pageScrollFinish.emit(true);
            return;
        }

        // Register the interrupt listeners if we want an interruptible scroll animation
        if (pageScrollInterruptible
            || (PageScrollService.isUndefinedOrNull(pageScrollInterruptible) && PageScrollConfig.defaultInterruptible)) {
            PageScrollManager.attachInterfereListeners(this.body);
            this.interruptListenersAttached = true;
        }

        this.timer = setInterval((conf: any) => {
            let currentTime: number = new Date().getTime();
            let newScrollTop: number;

            if (conf.endTime <= currentTime) {
                this.stopInternal(false);
                newScrollTop = conf.targetScrollTop;
            } else {
                newScrollTop = conf.easing(
                    currentTime - conf.startTime,
                    conf.startScrollTop,
                    conf.distanceToScroll,
                    conf.duration);
            }
            // Set the new scrollTop to all scrollTopSource elements
            this.scrollTopSources.forEach((scrollTopSource: any) => {
                if (scrollTopSource && !PageScrollService.isUndefinedOrNull(scrollTopSource.scrollTop)) {
                    scrollTopSource.scrollTop = newScrollTop;
                }
            });
        }, PageScrollConfig._interval, intervalConf);

        // Register the instance as running one
        PageScrollManager.add(this);
    }
    public stop(): boolean {
        return this.stopInternal(true);
    }




}

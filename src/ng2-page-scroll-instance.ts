/**
 * Created by sebastianfuss on 29.08.16.
 */

import {EventEmitter} from '@angular/core';
import {IEasingFunction, PageScrollConfig, PageScrollTarget, PageScrollingViews} from './ng2-page-scroll-config';
import {PageScrollService} from './ng2-page-scroll.service';

/**
 * Represents a scrolling action
 */
export class PageScrollInstance {

    // These properties will be set during instance construction
    private _namespace: string = PageScrollConfig._defaultNamespace;
    private document: Document;
    private _scrollTopSources: any[];

    private _startScrollTop: number = 0;
    private _targetScrollTop: number;
    private _distanceToScroll: number;
    private _duration: number = PageScrollConfig.defaultDuration;
    private _easing: IEasingFunction = PageScrollConfig.defaultEasingFunction;
    private _interruptible: boolean = PageScrollConfig.defaultInterruptible;
    // The listener that this scroll instance attaches to the body to listen for interrupt events
    private _interruptListener: EventListenerOrEventListenerObject;
    // Event emitter to notify the world about the scrolling
    private _pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

    // These properties will be set/manipulated if the scroll animation starts
    private _startTime: number;
    private _endTime: number;
    private _interruptListenersAttached: boolean = false;

    // This property holds a references to the timer instance that is used to perform the scroll animation
    private _timer: any = null;

    private static getInterruptListener(namespace: string): EventListenerOrEventListenerObject {
        return (event: Event): void => {
            // Stop the scroll animation if the user interferes/interrupts with it
            if (event.type !== 'keyup' || PageScrollConfig._interruptKeys.indexOf((<KeyboardEvent>event).keyCode) >= 0) {
                PageScrollService.stopAll(namespace);
            }
        };
    }

    private static extractScrollTarget(document: Document, scrollTarget: PageScrollTarget): HTMLElement {
        if (typeof scrollTarget === 'string') {
            return document.getElementById(scrollTarget.substr(1));
        }
        return <HTMLElement>scrollTarget;
    }

    // Factory methods for instance creation
    public static simpleInstance(document: Document,
                                 scrollTarget: PageScrollTarget,
                                 namespace?: string): PageScrollInstance {
        let scrollingViews: PageScrollingViews[] = [document.documentElement, document.body, document.body.parentNode];
        return PageScrollInstance.advancedInstance(
            document,
            scrollTarget,
            scrollingViews,
            namespace,
            null,
            null,
            null,
            null
        );
    }

    public static simpleInlineInstance(document: Document,
                                       scrollTarget: PageScrollTarget,
                                       scrollingView: PageScrollingViews,
                                       namespace?: string): PageScrollInstance {
        return PageScrollInstance.advancedInstance(
            document,
            scrollTarget,
            [scrollingView],
            namespace,
            null,
            null,
            null,
            null
        );
    }

    public static advancedInstance(document: Document,
                                   scrollTarget: PageScrollTarget,
                                   scrollingViews: PageScrollingViews[] = null,
                                   namespace: string,
                                   pageScrollOffset: number = null,
                                   pageScrollInterruptible: boolean = null,
                                   pageScrollEasing: IEasingFunction = null,
                                   pageScrollDuration: number = null): PageScrollInstance {

        if (PageScrollService.isUndefinedOrNull(namespace) || namespace.length <= 0) {
            namespace = PageScrollConfig._defaultNamespace;
        }
        let pageScrollInstance: PageScrollInstance = new PageScrollInstance(namespace, document);

        pageScrollInstance._scrollTopSources = scrollingViews;

        if (PageScrollService.isUndefinedOrNull(pageScrollOffset)) {
            pageScrollOffset = PageScrollConfig.defaultScrollOffset;
        }

        let offsetAdjustment = 0;
        let startScrollTopFound = false;

        // Get the start scroll position from the scrollingViews (e.g. if the user already scrolled down the content)
        pageScrollInstance.scrollTopSources.forEach((scrollingView: any) => {
            if (PageScrollService.isUndefinedOrNull(scrollingView)) {
                return;
            }
            // Get the scrolltop value of the first scrollTopSource that returns a value for its "scrollTop" property
            // that is not undefined and unequal to 0

            if (!startScrollTopFound && scrollingView.scrollTop) {
                // We found a scrollingView that does not have scrollTop 0

                // Return the scrollTop value, as this will be our startScrollTop
                pageScrollInstance._startScrollTop = scrollingView.scrollTop;
                startScrollTopFound = true;
            }

            // take the offsetTop of that scrollView and add it to the pageScrollOffset, as we need this if
            // the scrollingView is not the body/html-root element. If the current scrollingView is the
            // body/html-root is does not matter, as the offsetTop property of those is 0 anyway
            if (offsetAdjustment !== 0 && offsetAdjustment !== scrollingView.offsetTop) {
                console.warn('Using multiple scrollViews, but having different offsetTop values!');
                console.warn('Will silently ignore it and override previous offsetTop value');
            }
            offsetAdjustment = scrollingView.offsetTop;
        });

        // Adjust the offsetTop to properly scroll to target element that are located in "inline" scroll DOM elements
        pageScrollOffset += offsetAdjustment;

        // Calculate the target position that the scroll animation should go to
        let scrollTargetHTMLElement: HTMLElement = PageScrollInstance.extractScrollTarget(document, scrollTarget);
        pageScrollInstance._targetScrollTop = scrollTargetHTMLElement.offsetTop - pageScrollOffset;

        // Calculate the distance we need to go in total
        pageScrollInstance._distanceToScroll = pageScrollInstance.targetScrollTop - pageScrollInstance.startScrollTop;

        if (!PageScrollService.isUndefinedOrNull(pageScrollEasing)) {
            pageScrollInstance._easing = pageScrollEasing;
        }

        if (!PageScrollService.isUndefinedOrNull(pageScrollDuration)) {
            pageScrollInstance._duration = pageScrollDuration;
        }

        pageScrollInstance._interruptible = pageScrollInterruptible ||
            (PageScrollService.isUndefinedOrNull(pageScrollInterruptible) && PageScrollConfig.defaultInterruptible);
        if (pageScrollInstance._interruptible) {
            pageScrollInstance._interruptListener = PageScrollInstance.getInterruptListener(pageScrollInstance.namespace);
        }

        return pageScrollInstance;
    }

    /**
     * Private constructor, requires the properties assumed to be the bare minimum.
     * Use the factory methods to create instances: {@link PageScrollInstance#simpleInstance}
     * @param namespace
     * @param document
     */
    constructor(namespace: string, document: Document) {
        this._namespace = namespace;
        this.document = document;
    }

    public setScrollTopPosition(position: number): void {
        // Set the new scrollTop to all scrollTopSource elements
        this.scrollTopSources.forEach((scrollTopSource: any) => {
            if (scrollTopSource && !PageScrollService.isUndefinedOrNull(scrollTopSource.scrollTop)) {
                scrollTopSource.scrollTop = position;
            }
        });
    }

    public fireEvent(value: boolean): void {
        if (this._pageScrollFinish) {
            this._pageScrollFinish.emit(value);
        }
    }

    public attachInterruptListeners(): void {
        PageScrollConfig._interruptEvents.forEach(
            (event: string) => this.document.body.addEventListener(event, this._interruptListener)
        );
        this._interruptListenersAttached = true;
    }

    public detachInterruptListeners(): void {
        PageScrollConfig._interruptEvents.forEach(
            (event: string) => this.document.body.removeEventListener(event, this._interruptListener)
        );
        this._interruptListenersAttached = false;
    }

    public get namespace(): string {
        return this._namespace;
    }

    public get scrollTopSources(): any[] {
        return this._scrollTopSources;
    }

    public get startScrollTop(): number {
        return this._startScrollTop;
    }

    public get targetScrollTop(): number {
        return this._targetScrollTop;
    }

    public get distanceToScroll(): number {
        return this._distanceToScroll;
    }

    public get duration(): number {
        return this._duration;
    }

    public get easing(): IEasingFunction {
        return this._easing;
    }

    public get interruptible(): boolean {
        return this._interruptible;
    }

    public set startTime(value: number) {
        this._startTime = value;
    }

    public get startTime(): number {
        return this._startTime;
    }

    public set endTime(value: number) {
        this._endTime = value;
    }

    public get endTime(): number {
        return this._endTime;
    }

    public set timer(value: any) {
        this._timer = value;
    }

    public get timer(): any {
        return this._timer;
    }

    public get interruptListenersAttached(): boolean {
        return this._interruptListenersAttached;
    }

}

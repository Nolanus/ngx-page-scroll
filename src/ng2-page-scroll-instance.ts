/**
 * Created by sebastianfuss on 29.08.16.
 */

import {EventEmitter} from '@angular/core';

import {IEasingFunction, PageScrollConfig, PageScrollTarget, PageScrollingViews} from './ng2-page-scroll-config';
import {PageScrollUtilService} from './ng2-page-scroll-util.service';

/**
 * Represents a scrolling action
 */
export class PageScrollInstance {

    /**
     * These properties will be set during instance construction
     */

    /* A namespace to "group" scroll animations together and stopping some does not stop others */
    private _namespace: string = PageScrollConfig._defaultNamespace;
    /* The document all the scrolling takes place and scroll targets are located in */
    private document: Document;
    /* The DOM elements or similar nodes whose scrollTop property will be manipulated during scrolling */
    private _scrollTopSources: PageScrollingViews[];

    /* The initial value of the scrollTop position when the animation starts */
    private _startScrollTop: number = 0;
    /* The target value of the scrollTop position for the animation (aka "the final destination" */
    private _targetScrollTop: number;
    /* Difference between startScrollTop and targetScrollTop. Pre-calculated to minimize computations during animation */
    private _distanceToScroll: number;
    /* Duration in milliseconds the scroll animation should last */
    private _duration: number = PageScrollConfig.defaultDuration;
    /* Easing function to manipulate the scrollTop value over time */
    private _easing: IEasingFunction = PageScrollConfig.defaultEasingFunction;
    /* Boolean whether the scroll animation should stop on user interruption or not */
    private _interruptible: boolean = PageScrollConfig.defaultInterruptible;
    /* The listener that this scroll instance attaches to the body to listen for interrupt events
     We're keeping a reference to it so we can properly remove it when the animation finishes */
    private _interruptListener: EventListenerOrEventListenerObject;
    /* Event emitter to notify the world about the scrolling */
    private _pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * These properties will be set/manipulated if the scroll animation starts
     */

    /* The timestamp when the animation starts/got started */
    private _startTime: number;
    /* The estimate end time of the animation, calculated by startTime + duration */
    private _endTime: number;
    /* Whether an interrupt listener is attached to the body or not */
    private _interruptListenersAttached: boolean = false;

    /* References to the timer instance that is used to perform the scroll animation to be
     able to clear it on animation end*/
    private _timer: any = null;

    /**
     * Extract the scrollTarget HTMLElement from the given PageScrollTarget object. The latter one may be
     * a string like "#heading2", then this method returns the corresponding DOM element for that id.
     *
     * @param document
     * @param scrollTarget
     * @returns {HTMLElement}
     */
    private static extractScrollTarget(document: Document, scrollTarget: PageScrollTarget): HTMLElement {
        if (typeof scrollTarget === 'string') {
            return document.getElementById(scrollTarget.substr(1));
        }
        return <HTMLElement>scrollTarget;
    }

    /**
     * Factory methods for instance creation
     */
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

        if (PageScrollUtilService.isUndefinedOrNull(namespace) || namespace.length <= 0) {
            namespace = PageScrollConfig._defaultNamespace;
        }
        let pageScrollInstance: PageScrollInstance = new PageScrollInstance(namespace, document);

        pageScrollInstance._scrollTopSources = scrollingViews;

        if (PageScrollUtilService.isUndefinedOrNull(pageScrollOffset)) {
            pageScrollOffset = PageScrollConfig.defaultScrollOffset;
        }

        let offsetAdjustment = 0;
        let startScrollTopFound = false;

        // Get the start scroll position from the scrollingViews (e.g. if the user already scrolled down the content)
        pageScrollInstance.scrollTopSources.forEach((scrollingView: any) => {
            if (PageScrollUtilService.isUndefinedOrNull(scrollingView)) {
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

        if (!PageScrollUtilService.isUndefinedOrNull(pageScrollEasing)) {
            pageScrollInstance._easing = pageScrollEasing;
        }

        if (!PageScrollUtilService.isUndefinedOrNull(pageScrollDuration)) {
            pageScrollInstance._duration = pageScrollDuration;
        }

        pageScrollInstance._interruptible = pageScrollInterruptible ||
            (PageScrollUtilService.isUndefinedOrNull(pageScrollInterruptible) && PageScrollConfig.defaultInterruptible);

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

    /**
     * Sets the "scrollTop" property for all scrollingViews to the provided value
     * @param position
     */
    public setScrollTopPosition(position: number): void {
        // Set the new scrollTop to all scrollTopSource elements
        this.scrollTopSources.forEach((scrollTopSource: any) => {
            if (scrollTopSource && !PageScrollUtilService.isUndefinedOrNull(scrollTopSource.scrollTop)) {
                scrollTopSource.scrollTop = position;
            }
        });
    }

    /**
     * Trigger firing a animation finish event
     * @param value Whether the animation finished at the target (true) or got interrupted (false)
     */
    public fireEvent(value: boolean): void {
        if (this._pageScrollFinish) {
            this._pageScrollFinish.emit(value);
        }
    }

    /**
     * Attach the interrupt listeners to the PageScrollInstance body. The given interruptReporter
     * will be called if any of the attached events is fired.
     *
     * Possibly attached interruptListeners are automatically removed from the body before the new one will be attached.
     *
     * @param interruptReporter
     */
    public attachInterruptListeners(interruptReporter: InterruptReporter): void {
        if (this._interruptListenersAttached) {
            // Detach possibly existing listeners first
            this.detachInterruptListeners();
        }
        this._interruptListener = (event: Event): void => {
            interruptReporter.report(event, this);
        };
        PageScrollConfig._interruptEvents.forEach(
            (event: string) => this.document.body.addEventListener(event, this._interruptListener)
        );
        this._interruptListenersAttached = true;
    }

    /**
     * Remove event listeners from the body and stop listening for events that might be treated as "animation
     * interrupt" events.
     */
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

/**
 * An Interface a listener should implement to be notified about possible interrupt events
 * that happend due to user interaction while a scroll animation takes place.
 *
 * The PageScrollService provides an implementation to a PageScrollInstance to be notified
 * about scroll animation interrupts and stop related animations.
 */
export interface InterruptReporter {
    report: {
        (event: Event, pageScrollInstance: PageScrollInstance): void;
    };
}

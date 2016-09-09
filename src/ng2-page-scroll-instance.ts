/**
 * Created by sebastianfuss on 29.08.16.
 */

import {EventEmitter} from '@angular/core';

import {EasingLogic, PageScrollConfig, PageScrollTarget, PageScrollingViews} from './ng2-page-scroll-config';
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
    private _isInlineScrolling: boolean;
    /* The target element that should be scrolled into the viewport */
    private _scrollTarget: PageScrollTarget;

    /* Offset in px that the animation should stop above that target element */
    private _offset: number = PageScrollConfig.defaultScrollOffset;
    /* Duration in milliseconds the scroll animation should last */
    private _duration: number = PageScrollConfig.defaultDuration;
    /* Easing function to manipulate the scrollTop value over time */
    private _easingLogic: EasingLogic = PageScrollConfig.defaultEasingLogic;
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
    /* The initial value of the scrollTop position when the animation starts */
    private _startScrollTop: number = 0;
    /* The target value of the scrollTop position for the animation (aka "the final destination") */
    private _targetScrollTop: number;
    /* Difference between startScrollTop and targetScrollTop. Pre-calculated to minimize computations during animation */
    private _distanceToScroll: number;
    /* The timestamp when the animation starts/got started */
    private _startTime: number;
    /* The estimate end time of the animation, calculated by startTime + duration */
    private _endTime: number;
    /* Whether an interrupt listener is attached to the body or not */
    private _interruptListenersAttached: boolean = false;

    /* References to the timer instance that is used to perform the scroll animation to be
     able to clear it on animation end*/
    private _timer: any = null;

    /*
     * Factory methods for instance creation
     */
    /**
     * Create a PageScrollInstance representing a scroll animation on the documents body.
     *
     * @param document The document that contains the body to be scrolled and the scrollTarget elements
     * @param scrollTarget Where to scroll to. Can be a HTMLElement reference or a string like '#elementId'
     * @param namespace Optional namespace to group scroll animations logically
     *
     * @returns {PageScrollInstance}
     */
    public static simpleInstance(document: Document,
                                 scrollTarget: PageScrollTarget,
                                 namespace?: string): PageScrollInstance {
        return PageScrollInstance.advancedInstance(
            document,
            scrollTarget,
            null,
            namespace,
            null,
            null,
            null,
            null
        );
    }

    /**
     * Create a PageScrollInstance representing a scroll animation to the target element where the scrollingView
     * elements get scrolled (like a div container with fixed height, resulting in scrollbars in it).
     *
     * Make sure that the scrollTarget is located inside the scrollingView in the DOM hierarchy, otherwise the
     * scrollingView will be scrolled to an apparently arbitrary position.
     *
     * @param document The document that contains the body to be scrolled and the scrollTarget elements
     * @param scrollTarget Where to scroll to. Can be a HTMLElement reference or a string like '#elementId'
     * @param scrollingView The element that should be scrolled
     * @param namespace Optional namespace to group scroll animations logically
     *
     * @returns {PageScrollInstance}
     */
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

    /**
     *
     * @param document The document that contains the body to be scrolled and the scrollTarget elements
     * @param scrollTarget Where to scroll to. Can be a HTMLElement reference or a string like '#elementId'
     * @param scrollingViews The elements that should be scrolled. Null to use the default elements of document and body.
     * @param namespace Optional namespace to group scroll animations logically
     * @param pageScrollOffset The offset to be attached to the top of the target element or
     *                          null/undefined to use application default
     * @param pageScrollInterruptible Whether this scroll animation should be interruptible.
     *                                 Null/undefined for application default
     * @param pageScrollEasingLogic Easing function to be used for manipulating the scroll position
     *                          over time. Null/undefined for application default
     * @param pageScrollDuration The duration in milliseconds the animation should last.
     *                            Null/undefined for application default
     * @param pageScrollFinishListener Listener to be called to notify other parts of the application
     *                                  that the scroll animation has finished
     *
     * @returns {PageScrollInstance}
     */
    public static advancedInstance(document: Document,
                                   scrollTarget: PageScrollTarget,
                                   scrollingViews: PageScrollingViews[] = null,
                                   namespace: string,
                                   pageScrollOffset: number = null,
                                   pageScrollInterruptible: boolean = null,
                                   pageScrollEasingLogic: EasingLogic = null,
                                   pageScrollDuration: number = null,
                                   pageScrollFinishListener: EventEmitter<boolean> = null): PageScrollInstance {

        if (PageScrollUtilService.isUndefinedOrNull(namespace) || namespace.length <= 0) {
            namespace = PageScrollConfig._defaultNamespace;
        }
        let pageScrollInstance: PageScrollInstance = new PageScrollInstance(namespace, document);

        if (PageScrollUtilService.isUndefinedOrNull(scrollingViews) || scrollingViews.length === 0) {
            pageScrollInstance._isInlineScrolling = false;
            pageScrollInstance._scrollTopSources = [document.documentElement, document.body, document.body.parentNode];
        } else {
            pageScrollInstance._isInlineScrolling = true;
            pageScrollInstance._scrollTopSources = scrollingViews;
        }

        pageScrollInstance._scrollTarget = scrollTarget;

        if (!PageScrollUtilService.isUndefinedOrNull(pageScrollOffset)) {
            pageScrollInstance._offset = pageScrollOffset;
        }

        if (!PageScrollUtilService.isUndefinedOrNull(pageScrollEasingLogic)) {
            pageScrollInstance._easingLogic = pageScrollEasingLogic;
        }

        if (!PageScrollUtilService.isUndefinedOrNull(pageScrollDuration)) {
            pageScrollInstance._duration = pageScrollDuration;
        }

        if (!PageScrollUtilService.isUndefinedOrNull(pageScrollFinishListener)) {
            pageScrollInstance._pageScrollFinish = pageScrollFinishListener;
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
     * Extract the exact location of the scrollTarget element.
     *
     * Extract the scrollTarget HTMLElement from the given PageScrollTarget object. The latter one may be
     * a string like "#heading2", then this method returns the corresponding DOM element for that id.
     *
     * @returns {HTMLElement}
     */
    public extractScrollTargetPosition(): {top: number, left: number} {
        let scrollTargetElement: HTMLElement;
        if (typeof this._scrollTarget === 'string') {
            scrollTargetElement = this.document.getElementById((<string>this._scrollTarget).substr(1));
        } else {
            scrollTargetElement = <HTMLElement>this._scrollTarget;
        }

        if (this._isInlineScrolling) {
            return {top: scrollTargetElement.offsetTop, left: scrollTargetElement.offsetLeft};
        }

        return PageScrollUtilService.extractElementPosition(this.document, scrollTargetElement);
    }

    /**
     * Get the top offset of the scroll animation.
     * This automatically takes the offset location of the scrolling container/scrolling view
     * into account (for nested/inline scrolling).
     *
     * @returns {number}
     */
    public getCurrentOffset(): number {
        return this._offset;
    }

    /**
     * Sets the "scrollTop" property for all scrollingViews to the provided value
     * @param position
     * @return true if at least for one ScrollTopSource the scrollTop value could be set and it kept the new value.
     *          false if it failed for all ScrollTopSources, meaning that we should stop the animation
     *          (probably because we're at the end of the scrolling region)
     */
    public setScrollTopPosition(position: number): boolean {
        // Set the new scrollTop to all scrollTopSource elements
        return this.scrollTopSources.reduce((oneAlreadyWorked: any, scrollTopSource: any) => {
            if (scrollTopSource && !PageScrollUtilService.isUndefinedOrNull(scrollTopSource.scrollTop)) {
                scrollTopSource.scrollTop = position;
                // Return true of setting the new scrollTop value worked
                if (scrollTopSource.scrollTop === position) {
                    return true;
                }
            }
            return oneAlreadyWorked;
        }, false);
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

    public set startScrollTop(value: number) {
        this._startScrollTop = value;
    }

    public get startScrollTop(): number {
        return this._startScrollTop;
    }

    public set targetScrollTop(value: number) {
        this._targetScrollTop = value;
    }

    public get targetScrollTop(): number {
        return this._targetScrollTop;
    }

    public set distanceToScroll(value: number) {
        this._distanceToScroll = value;
    }

    public get distanceToScroll(): number {
        return this._distanceToScroll;
    }

    public get duration(): number {
        return this._duration;
    }

    public get easingLogic(): EasingLogic {
        return this._easingLogic;
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

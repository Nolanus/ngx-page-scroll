import { EventEmitter, isDevMode } from '@angular/core';

import { EasingLogic, PageScrollConfig, PageScrollTarget, PageScrollingViews } from './ngx-page-scroll-config';
import { PageScrollUtilService as Util } from './ngx-page-scroll-util.service';

/**
 * An Interface specifying the possible options to be passed into the newInstance() factory method
 */
export interface PageScrollOptions {
    /**
     * The document object of the current app
     */
    document: Document;

    /**
     * A specification of the DOM element to scroll to. Either a string referring to an
     * element using a valid css selector (`#target`, `.class`, `div.class`) or a HTMLElement
     * that is attached to the document's DOM tree.
     */
    scrollTarget: PageScrollTarget;

    /**
     * Array of HTMLElements or the body object that should be manipulated while performing
     * the scroll animation.
     */
    scrollingViews?: PageScrollingViews[];

    /**
     * Namespace of the scroll animation
     */
    namespace?: string;

    /**
     * Whether that scroll animation scrolls in vertical direction (true) or
     * horizontal (false, default value)
     */
    verticalScrolling?: boolean;

    /**
     * Whether the an advanced offset calculation for inline scrollings should be applied
     */
    advancedInlineOffsetCalculation?: boolean;

    /**
     * Offset of target elements location and scroll location
     */
    pageScrollOffset?: number;

    /**
     * Whether the scroll animation should be interruptible
     */
    pageScrollInterruptible?: boolean;

    /**
     * The easing logic to be used
     */
    pageScrollEasingLogic?: EasingLogic;

    /**
     * Duration in milliseconds the scroll animation should last
     */
    pageScrollDuration?: number;

    /**
     * Maximum speed to be used for the scroll animation. Only taken
     * into account of no pageScrollDuration is provided
     */
    pageScrollSpeed?: number;

    /**
     * A listener to be called whenever the scroll animation stops
     */
    pageScrollFinishListener?: EventEmitter<boolean>;
}

/**
 * Represents a scrolling action
 */
export class PageScrollInstance {

    /**
     * These properties will be set during instance construction and default to their defaults from PageScrollConfig
     */

    /* A namespace to "group" scroll animations together and stopping some does not stop others */
    private _namespace: string = PageScrollConfig._defaultNamespace;
    /* The document all the scrolling takes place and scroll targets are located in */
    private document: Document;
    /* The DOM elements or similar nodes whose scrollTop/scrollLeft property will be manipulated during scrolling */
    private _scrollingViews: PageScrollingViews[];
    private _isInlineScrolling: boolean;
    /* The target element that should be scrolled into the viewport */
    private _scrollTarget: PageScrollTarget;

    /* Whether we scroll vertically (true) or horizontally (false) */
    private _verticalScrolling = PageScrollConfig.defaultIsVerticalScrolling;
    /* Offset in px that the animation should stop above that target element */
    private _offset: number = PageScrollConfig.defaultScrollOffset;
    /* Duration in milliseconds the scroll animation should last */
    private _duration: number = PageScrollConfig.defaultDuration;
    /* Speed in "pixels/second" to be used when scrolling to the target element */
    private _speed: number;
    /* Easing function to manipulate the scrollTop/scrollLeft value over time */
    private _easingLogic: EasingLogic = PageScrollConfig.defaultEasingLogic;
    /* Boolean whether the scroll animation should stop on user interruption or not */
    private _interruptible: boolean = PageScrollConfig.defaultInterruptible;
    /* The listener that this scroll instance attaches to the body to listen for interrupt events
     We're keeping a reference to it so we can properly remove it when the animation finishes */
    private _interruptListener: EventListenerOrEventListenerObject;
    /* Whether the advanded offset calculation for inline scrolling should be used */
    private _advancedInlineOffsetCalculation: boolean = PageScrollConfig.defaultAdvancedInlineOffsetCalculation;
    /* Event emitter to notify the world about the scrolling */
    private _pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * These properties will be set/manipulated if the scroll animation starts
     */
    /* The initial value of the scrollTop or scrollLeft position when the animation starts */
    private _startScrollPosition = 0;
    /* The target value of the scrollTop or scrollLeft position for the animation (aka "the final destination") */
    private _targetScrollPosition: number;
    /* Difference between startScrollPosition and targetScrollPosition. Pre-calculated to minimize computations during animation */
    private _distanceToScroll: number;
    /* The timestamp when the animation starts/got started */
    private _startTime: number;
    /* The estimate end time of the animation, calculated by startTime + duration */
    private _endTime: number;
    /* The duration a started animation takes. This may match the _duration or be adjusted due to the _speed option */
    private _executionDuration: number;
    /* Whether an interrupt listener is attached to the body or not */
    private _interruptListenersAttached = false;

    /* References to the timer instance that is used to perform the scroll animation to be
     able to clear it on animation end*/
    private _timer: any = null;

    /*
     * Factory methods for instance creation
     */
    public static simpleInstance(document: Document,
                                 scrollTarget: PageScrollTarget,
                                 namespace?: string): PageScrollInstance {
        return PageScrollInstance.newInstance({
            document,
            scrollTarget,
            namespace
        });
    }

    public static newInstance(options: PageScrollOptions) {

        if (Util.isUndefinedOrNull(options.namespace) || options.namespace.length <= 0) {
            options.namespace = PageScrollConfig._defaultNamespace;
        }
        let pageScrollInstance: PageScrollInstance = new PageScrollInstance(options.namespace, document);

        if (Util.isUndefinedOrNull(options.scrollingViews) || options.scrollingViews.length === 0) {
            pageScrollInstance._isInlineScrolling = false;
            pageScrollInstance._scrollingViews = [document.documentElement, document.body, document.body.parentNode];
        } else {
            pageScrollInstance._isInlineScrolling = true;
            pageScrollInstance._scrollingViews = options.scrollingViews;
        }

        pageScrollInstance._scrollTarget = options.scrollTarget;

        if (!Util.isUndefinedOrNull(options.verticalScrolling)) {
            pageScrollInstance._verticalScrolling = options.verticalScrolling;
        }

        if (!Util.isUndefinedOrNull(options.pageScrollOffset)) {
            pageScrollInstance._offset = options.pageScrollOffset;
        }

        if (!Util.isUndefinedOrNull(options.pageScrollEasingLogic)) {
            pageScrollInstance._easingLogic = options.pageScrollEasingLogic;
        }

        if (Util.isUndefinedOrNull(options.pageScrollDuration) && !Util.isUndefinedOrNull(options.pageScrollSpeed)) {
            // No duration specified in the options, only in this case we use the speed option when present
            pageScrollInstance._speed = options.pageScrollSpeed;
            pageScrollInstance._duration = undefined;
        } else if (!Util.isUndefinedOrNull(options.pageScrollDuration)) {
            pageScrollInstance._duration = options.pageScrollDuration;
        }

        if (!Util.isUndefinedOrNull(options.pageScrollFinishListener)) {
            pageScrollInstance._pageScrollFinish = options.pageScrollFinishListener;
        }

        pageScrollInstance._interruptible = options.pageScrollInterruptible ||
            (Util.isUndefinedOrNull(options.pageScrollInterruptible) && PageScrollConfig.defaultInterruptible);

        pageScrollInstance._advancedInlineOffsetCalculation = options.advancedInlineOffsetCalculation ||
            (Util.isUndefinedOrNull(options.advancedInlineOffsetCalculation) &&
                PageScrollConfig.defaultAdvancedInlineOffsetCalculation);

        return pageScrollInstance;
    }

    /**
     * Private constructor, requires the properties assumed to be the bare minimum.
     * Use the factory methods to create instances:
     *      {@link PageScrollInstance#simpleInstance}
     *      {@link PageScrollInstance#newInstance}
     * @param namespace
     * @param document
     */
    constructor(namespace: string, document: Document) {
        this._namespace = namespace;
        this.document = document;
    }

    public getScrollPropertyValue(scrollingView: any): number {
        if (!this.verticalScrolling) {
            return scrollingView.scrollLeft;
        }
        return scrollingView.scrollTop;
    }

    /**
     * Extract the exact location of the scrollTarget element.
     *
     * Extract the scrollTarget HTMLElement from the given PageScrollTarget object. The latter one may be
     * a string like "#heading2", then this method returns the corresponding DOM element for that id.
     *
     * @returns {HTMLElement}
     */
    public extractScrollTargetPosition(): { top: number, left: number } {
        let scrollTargetElement: HTMLElement;
        if (typeof this._scrollTarget === 'string') {
            let targetSelector = <string>this._scrollTarget;
            if (targetSelector.match(/^#[^\s]+$/g) !== null) {
                // It's an id selector and a valid id, as it does not contain any white space characters
                scrollTargetElement = this.document.getElementById(targetSelector.substr(1));
            } else {
                scrollTargetElement = <HTMLElement>this.document.querySelector(targetSelector);
            }
        } else {
            scrollTargetElement = <HTMLElement>this._scrollTarget;
        }

        if (scrollTargetElement === null || scrollTargetElement === undefined) {
            // Scroll target not found
            return {top: NaN, left: NaN};
        }

        if (this._isInlineScrolling) {
            let position = {top: scrollTargetElement.offsetTop, left: scrollTargetElement.offsetLeft};
            if (this._advancedInlineOffsetCalculation && this.scrollingViews.length === 1) {
                let accumulatedParentsPos = {top: 0, left: 0};
                // not named window to make sure we're not getting the global window variable by accident
                let theWindow = scrollTargetElement.ownerDocument.defaultView;
                let parentFound = false;

                // Start parent is the immediate parent
                let parent = scrollTargetElement.parentElement;

                // Iterate upwards all parents
                while (!parentFound && !Util.isUndefinedOrNull(parent)) {
                    if (theWindow.getComputedStyle(parent).getPropertyValue('position') === 'relative') {
                        accumulatedParentsPos.top += parent.offsetTop;
                        accumulatedParentsPos.left += parent.offsetLeft;
                    }
                    // Next iteration
                    parent = parent.parentElement;
                    parentFound = parent === this.scrollingViews[0];
                }
                if (parentFound) {
                    // Only use the results if we found the parent, otherwise we accumulated too much anyway
                    position.top += accumulatedParentsPos.top;
                    position.left += accumulatedParentsPos.left;
                } else {
                    if (PageScrollConfig._logLevel >= 2 || (PageScrollConfig._logLevel >= 1 && isDevMode())) {
                        console.warn('Unable to find nested scrolling targets parent!');
                    }
                }
            }
            return position;
        }

        return Util.extractElementPosition(this.document, scrollTargetElement);
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
     * Sets the "scrollTop" or "scrollLeft" property for all scrollingViews to the provided value
     * @param position
     * @return true if at least for one ScrollTopSource the scrollTop/scrollLeft value could be set and it kept the new value.
     *          false if it failed for all ScrollingViews, meaning that we should stop the animation
     *          (probably because we're at the end of the scrolling region)
     */
    public setScrollPosition(position: number): boolean {
        if (PageScrollConfig._logLevel >= 5 && isDevMode()) {
            console.warn('Scroll Position: ' + position);
        }
        // Set the new scrollTop/scrollLeft to all scrollingViews elements
        return this.scrollingViews.reduce((oneAlreadyWorked: any, scrollingView: any) => {
            let startScrollPropertyValue = this.getScrollPropertyValue(scrollingView);
            if (scrollingView && !Util.isUndefinedOrNull(startScrollPropertyValue)) {
                let scrollDistance = Math.abs(startScrollPropertyValue - position);

                // The movement we need to perform is less than 2px
                // This we consider a small movement which some browser may not perform when
                // changing the scrollTop/scrollLeft property
                // Thus in this cases we do not stop the scroll animation, although setting the
                // scrollTop/scrollLeft value "fails"
                let isSmallMovement = scrollDistance < PageScrollConfig._minScrollDistance;

                if (!this.verticalScrolling) {
                    scrollingView.scrollLeft = position;
                } else {
                    scrollingView.scrollTop = position;
                }

                // Return true of setting the new scrollTop/scrollLeft value worked
                // We consider that it worked if the new scrollTop/scrollLeft value is closer to the
                // desired scrollTop/scrollLeft than before (it might not be exactly the value we
                // set due to dpi or rounding irregularities)
                if (isSmallMovement || scrollDistance > Math.abs(this.getScrollPropertyValue(scrollingView) - position)) {
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

    get scrollTarget(): PageScrollTarget {
        return this._scrollTarget;
    }

    get verticalScrolling(): boolean {
        return this._verticalScrolling;
    }

    public get scrollingViews(): any[] {
        return this._scrollingViews;
    }

    public set startScrollPosition(value: number) {
        this._startScrollPosition = value;
    }

    public get startScrollPosition(): number {
        return this._startScrollPosition;
    }

    public set targetScrollPosition(value: number) {
        this._targetScrollPosition = value;
    }

    public get targetScrollPosition(): number {
        return this._targetScrollPosition;
    }

    public set distanceToScroll(value: number) {
        this._distanceToScroll = value;
    }

    public get distanceToScroll(): number {
        return this._distanceToScroll;
    }

    get executionDuration(): number {
        return this._executionDuration;
    }

    set executionDuration(value: number) {
        this._executionDuration = value;
    }

    public get duration(): number {
        return this._duration;
    }

    public get speed(): number {
        return this._speed;
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
 * that happened due to user interaction while a scroll animation takes place.
 *
 * The PageScrollService provides an implementation to a PageScrollInstance to be notified
 * about scroll animation interrupts and stop related animations.
 */
export interface InterruptReporter {
    report: {
        (event: Event, pageScrollInstance: PageScrollInstance): void;
    };
}

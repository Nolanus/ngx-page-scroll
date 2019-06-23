import { EventEmitter } from '@angular/core';
import { PageScrollConfig } from './types/page-scroll.config';
import { PageScrollTarget } from './types/page-scroll-target';
import { PageScrollViews } from './types/page-scroll-view';
import { EasingLogic } from './types/easing-logic';

/**
 * An Interface specifying the possible options to be passed into the newInstance() factory method
 */
export interface PageScrollOptions extends PageScrollConfig {
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
  scrollViews?: PageScrollViews[];

  /**
   * Maximum speed to be used for the scroll animation. Only taken
   * into account of no duration is provided
   */
  speed?: number;

  /**
   * A listener to be called whenever the scroll animation stops
   */
  scrollFinishListener?: EventEmitter<boolean>;

  namespace?: string;
  verticalScrolling?: boolean;
  duration?: number;
  scrollOffset?: number;
  advancedInlineOffsetCalculation?: boolean;
  interruptEvents?: string[];
  interruptKeys?: string[];
  interruptible?: boolean;
  scrollInView?: boolean;
  easingLogic?: EasingLogic;
}

/**
 * Represents a scrolling action
 */
export class PageScrollInstance {

  public pageScrollOptions: PageScrollOptions;

  private isInlineScrolling: boolean;

  /* The listener that this scroll instance attaches to the body to listen for interrupt events
  We're keeping a reference to it so we can properly remove it when the animation finishes */
  private interruptListener: EventListenerOrEventListenerObject;

  /**
   * These properties will be set/manipulated if the scroll animation starts
   */
  /* The initial value of the scrollTop or scrollLeft position when the animation starts */
  public startScrollPosition = 0;
  /* The target value of the scrollTop or scrollLeft position for the animation (aka "the final destination") */
  public targetScrollPosition: number;
  /* Difference between startScrollPosition and targetScrollPosition. Pre-calculated to minimize computations during animation */
  public distanceToScroll: number;
  /* The timestamp when the animation starts/got started */
  public startTime: number;
  /* The estimate end time of the animation, calculated by startTime + duration */
  public endTime: number;
  /* The duration a started animation takes. This may match the _duration or be adjusted due to the _speed option */
  public executionDuration: number;
  /* Whether an interrupt listener is attached to the body or not */
  public interruptListenersAttached = false;

  /* References to the timer instance that is used to perform the scroll animation to be
   able to clear it on animation end*/
  public timer: any = null;

  /**
   * Private constructor, requires the properties assumed to be the bare minimum.
   * Use the factory methods to create instances:
   *      {@link PageScrollService#create}
   */
  constructor(pageScrollOptions: PageScrollOptions) {
    if (!pageScrollOptions.scrollViews || pageScrollOptions.scrollViews.length === 0) {
      pageScrollOptions.scrollViews = [
        pageScrollOptions.document.documentElement,
        pageScrollOptions.document.body,
        pageScrollOptions.document.body.parentNode,
      ];
      this.isInlineScrolling = false;
    } else {
      this.isInlineScrolling = true;
    }

    this.pageScrollOptions = pageScrollOptions;
  }

  private static getScrollingTargetPosition(pageScrollOptions: PageScrollOptions,
                                            scrollTargetElement: HTMLElement): { top: number, left: number } {
    const body = pageScrollOptions.document.body;
    const docEl = pageScrollOptions.document.documentElement;

    const windowPageYOffset: number = pageScrollOptions.document.defaultView &&
      pageScrollOptions.document.defaultView.pageYOffset || undefined;
    const windowPageXOffset: number = pageScrollOptions.document.defaultView &&
      pageScrollOptions.document.defaultView.pageXOffset || undefined;

    const scrollTop = windowPageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = windowPageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    if (scrollTargetElement === undefined || scrollTargetElement === null) {
      // No element found, so return the current position to not cause any change in scroll position
      return {top: scrollTop, left: scrollLeft};
    }
    const box = scrollTargetElement.getBoundingClientRect();

    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
  }

  private static getInlineScrollingTargetPosition(pageScrollOptions: PageScrollOptions,
                                                  scrollTargetElement: HTMLElement): { top: number, left: number } {
    const position = {top: scrollTargetElement.offsetTop, left: scrollTargetElement.offsetLeft};
    if (pageScrollOptions.advancedInlineOffsetCalculation && pageScrollOptions.scrollViews.length === 1) {
      const accumulatedParentsPos = {top: 0, left: 0};
      // not named window to make sure we're not getting the global window variable by accident
      const theWindow = scrollTargetElement.ownerDocument.defaultView;
      let parentFound = false;

      // Start parent is the immediate parent
      let parent = scrollTargetElement.parentElement;

      // Iterate upwards all parents
      while (!parentFound && parent !== undefined && parent !== null) {
        if (theWindow.getComputedStyle(parent).getPropertyValue('position') === 'relative') {
          accumulatedParentsPos.top += parent.offsetTop;
          accumulatedParentsPos.left += parent.offsetLeft;
        }
        // Next iteration
        parent = parent.parentElement;
        parentFound = parent === pageScrollOptions.scrollViews[0];
      }
      if (parentFound) {
        // Only use the results if we found the parent, otherwise we accumulated too much anyway
        position.top += accumulatedParentsPos.top;
        position.left += accumulatedParentsPos.left;
      } else {
        /* TODO Uncomment
        if (PageScrollConfig._logLevel >= 2 || (PageScrollConfig._logLevel >= 1 && isDevMode())) {
          console.warn('Unable to find nested scrolling targets parent!');
        }*/
      }
    }

    return position;
  }

  public getScrollPropertyValue(scrollingView: any): number {
    if (!this.pageScrollOptions.verticalScrolling) {
      return scrollingView.scrollLeft;
    }

    return scrollingView.scrollTop;
  }

  public getScrollClientPropertyValue(scrollingView: any): number {
    if (!this.pageScrollOptions.verticalScrolling) {
      return scrollingView.clientWidth;
    }

    return scrollingView.clientHeight;
  }

  /**
   * Extract the exact location of the scrollTarget element.
   *
   * Extract the scrollTarget HTMLElement from the given PageScrollTarget object. The latter one may be
   * a string like "#heading2", then this method returns the corresponding DOM element for that id.
   *
   */
  public extractScrollTargetPosition(): { top: number, left: number } {
    const scrollTargetElement = this.getScrollTargetElement();

    if (scrollTargetElement === null || scrollTargetElement === undefined) {
      // Scroll target not found
      return {top: NaN, left: NaN};
    }

    if (this.isInlineScrolling) {
      return PageScrollInstance.getInlineScrollingTargetPosition(this.pageScrollOptions, scrollTargetElement);
    }

    return PageScrollInstance.getScrollingTargetPosition(this.pageScrollOptions, scrollTargetElement);
  }

  /**
   * Get the top offset of the scroll animation.
   * This automatically takes the offset location of the scrolling container/scrolling view
   * into account (for nested/inline scrolling).
   */
  public getCurrentOffset(): number {
    return this.pageScrollOptions.scrollOffset;
  }

  /**
   * Sets the "scrollTop" or "scrollLeft" property for all scrollViews to the provided value
   * @return true if at least for one ScrollTopSource the scrollTop/scrollLeft value could be set and it kept the new value.
   *          false if it failed for all ScrollViews, meaning that we should stop the animation
   *          (probably because we're at the end of the scrolling region)
   */
  public setScrollPosition(position: number): boolean {
    // Set the new scrollTop/scrollLeft to all scrollViews elements
    return this.pageScrollOptions.scrollViews.reduce((oneAlreadyWorked: any, scrollingView: any) => {
      const startScrollPropertyValue = this.getScrollPropertyValue(scrollingView);
      if (scrollingView && startScrollPropertyValue !== undefined && startScrollPropertyValue !== null) {
        const scrollDistance = Math.abs(startScrollPropertyValue - position);

        // The movement we need to perform is less than 2px
        // This we consider a small movement which some browser may not perform when
        // changing the scrollTop/scrollLeft property
        // Thus in this cases we do not stop the scroll animation, although setting the
        // scrollTop/scrollLeft value "fails"
        const isSmallMovement = scrollDistance < this.pageScrollOptions._minScrollDistance;

        if (!this.pageScrollOptions.verticalScrolling) {
          scrollingView.scrollLeft = position;
        } else {
          scrollingView.scrollTop = position;
        }

        // Return true if setting the new scrollTop/scrollLeft value worked
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
    if (this.pageScrollOptions.scrollFinishListener) {
      this.pageScrollOptions.scrollFinishListener.emit(value);
    }
  }

  /**
   * Attach the interrupt listeners to the PageScrollInstance body. The given interruptReporter
   * will be called if any of the attached events is fired.
   *
   * Possibly attached interruptListeners are automatically removed from the body before the new one will be attached.
   */
  public attachInterruptListeners(interruptReporter: InterruptReporter): void {
    if (this.interruptListenersAttached) {
      // Detach possibly existing listeners first
      this.detachInterruptListeners();
    }
    this.interruptListener = (event: Event): void => {
      interruptReporter.report(event, this);
    };
    this.pageScrollOptions.interruptEvents.forEach(
      (event: string) => this.pageScrollOptions.document.body.addEventListener(event, this.interruptListener)
    );
    this.interruptListenersAttached = true;
  }

  /**
   * Remove event listeners from the body and stop listening for events that might be treated as "animation
   * interrupt" events.
   */
  public detachInterruptListeners(): void {
    this.pageScrollOptions.interruptEvents.forEach(
      (event: string) => this.pageScrollOptions.document.body.removeEventListener(event, this.interruptListener)
    );
    this.interruptListenersAttached = false;
  }

  private getScrollTargetElement(): HTMLElement {
    if (typeof this.pageScrollOptions.scrollTarget === 'string') {
      const targetSelector = <string>this.pageScrollOptions.scrollTarget;
      if (targetSelector.match(/^#[^\s]+$/g) !== null) {
        // It's an id selector and a valid id, as it does not contain any white space characters

        return this.pageScrollOptions.document.getElementById(targetSelector.substr(1));
      }

      return <HTMLElement>this.pageScrollOptions.document.querySelector(targetSelector);
    }

    return <HTMLElement>this.pageScrollOptions.scrollTarget;
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
  report(event: Event, pageScrollInstance: PageScrollInstance): void;
}

/* eslint-disable @angular-eslint/no-host-metadata-property, @angular-eslint/directive-selector */

import {
  Directive,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges
} from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, Router, UrlTree } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { EasingLogic, PageScrollInstance, PageScrollOptions, PageScrollService } from 'ngx-page-scroll-core';
import { filter, take } from 'rxjs/operators';

@Directive({
    selector: '[pageScroll]',
    host: {
        '(click)': 'handleClick($event)',
    },
    standalone: false
})
export class NgxPageScrollDirective implements OnChanges, OnDestroy {

  @Input()
  public routerLink;

  @Input()
  public href: string;

  @Input()
  public fragment: string;

  @Input()
  public pageScrollTarget: string;

  @Input()
  public pageScrollHorizontal: boolean;

  @Input()
  public pageScrollOffset: number;

  @Input()
  public pageScrollDuration: number;

  @Input()
  public pageScrollSpeed: number;

  @Input()
  public pageScrollEasing: EasingLogic;

  @Input()
  public pageScrollInterruptible: boolean;

  @Input()
  public pageScrollInView: boolean;

  @Input()
  public pageScrollAdjustHash = false;

  @Input()
  public pageScroll: string;

  @Output()
  pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

  private pageScrollInstance: PageScrollInstance;
  private document: Document;

  constructor(private pageScrollService: PageScrollService, @Optional() private router: Router, @Inject(DOCUMENT) document) {
    this.document = (document as Document);
  }

  ngOnChanges(changes: SimpleChanges): void {// eslint-disable-line @typescript-eslint/no-unused-vars
    // Some inputs changed, reset the pageScrollInstance
    this.pageScrollInstance = undefined;
  }

  ngOnDestroy(): void {
    if (this.pageScrollInstance) {
      this.pageScrollService.stop(this.pageScrollInstance);
    }
  }

  private getPageScrollTarget(): string {
    return this.pageScrollTarget || this.href || (this.fragment ? '#' + this.fragment : '');
  }

  private generatePageScrollInstance(): PageScrollInstance {
    if (this.pageScrollInstance === undefined || this.pageScrollInstance === null) {
      const options: PageScrollOptions = {
        document: this.document,
        scrollTarget: this.getPageScrollTarget(),
      };

      if (this.pageScroll) {
        options.namespace = this.pageScroll;
      }
      if (this.pageScrollHorizontal !== undefined && this.pageScrollHorizontal !== null) {
        options.verticalScrolling = !this.pageScrollHorizontal;
      }
      if (this.pageScrollOffset !== undefined && this.pageScrollOffset !== null) {
        options.scrollOffset = this.pageScrollOffset;
      }
      if (this.pageScrollInterruptible !== undefined && this.pageScrollInterruptible !== null) {
        options.interruptible = this.pageScrollInterruptible;
      }
      if (this.pageScrollInView !== undefined && this.pageScrollInView !== null) {
        options.scrollInView = this.pageScrollInView;
      }
      if (this.pageScrollEasing) {
        options.easingLogic = this.pageScrollEasing;
      }
      if (this.pageScrollDuration !== undefined && this.pageScrollDuration !== null) {
        options.duration = this.pageScrollDuration;
      }
      if (this.pageScrollSpeed !== undefined && this.pageScrollSpeed !== null) {
        options.speed = this.pageScrollSpeed;
      }
      if (this.pageScrollFinish) {
        options.scrollFinishListener = this.pageScrollFinish;
      }
      this.pageScrollInstance = this.pageScrollService.create(options);
    }

    return this.pageScrollInstance;
  }

  private pushRouterState(): void {
    if (this.pageScrollAdjustHash && typeof this.pageScrollInstance.pageScrollOptions.scrollTarget === 'string'
      && (this.pageScrollInstance.pageScrollOptions.scrollTarget as string).substr(0, 1) === '#') {
      // "Navigate" to the current route again and this time set the fragment/hash
      this.router.navigate([], {
        fragment: (this.pageScrollInstance.pageScrollOptions.scrollTarget as string).substr(1),
        queryParamsHandling: 'preserve',
      });
    }
  }

  private scroll(): void {
    const pageScrollInstance = this.generatePageScrollInstance();
    this.pushRouterState();
    this.pageScrollService.start(pageScrollInstance);
  }

  public handleClick(clickEvent: Event): boolean { // eslint-disable-line @typescript-eslint/no-unused-vars
    if (this.routerLink && this.router !== null && this.router !== undefined) {
      let urlTree: UrlTree;
      if (typeof this.routerLink === 'string') {
        urlTree = this.router.parseUrl(this.routerLink);
      } else {
        urlTree = this.router.createUrlTree(this.routerLink);
      }
      if (!this.router.isActive(urlTree, true)) {
        // We need to navigate their first.
        // Navigation is handled by the routerLink directive so we only need to listen for route change
        this.router.events.pipe(filter(routerEvent => {
            // We're only interested in successful navigations or when the navigation fails
            return routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError
              || routerEvent instanceof NavigationCancel;
          }),
          // Consume only one event, automatically "unsubscribing" from the event stream afterwards
          take(1)
        ).subscribe((routerEvent) => {
          if (routerEvent instanceof NavigationEnd) {
            // use a timeout to start scrolling as soon as the stack is cleared
            setTimeout(() => {
              this.scroll();
            }, 0);
          }
        });

        return false; // to preventDefault()
      }
    }
    this.scroll();

    return false; // to preventDefault()
  }
}

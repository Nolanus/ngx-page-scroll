/* tslint:disable:use-host-property-decorator directive-selector */

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

import { Subscription } from 'rxjs';
import { EasingLogic, PageScrollInstance, PageScrollOptions, PageScrollService } from 'ngx-page-scroll-core';

@Directive({
  selector: '[pageScroll]',
  host: {
    '(click)': 'handleClick($event)',
  }
})
export class NgxPageScrollDirective implements OnChanges, OnDestroy {

  @Input()
  public routerLink: any;

  @Input()
  public href: string;

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
  public pageScrollAdjustHash = false;

  @Input()
  public pageScroll: string;

  @Output()
  pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

  private pageScrollInstance: PageScrollInstance;
  private document: Document;

  constructor(private pageScrollService: PageScrollService, @Optional() private router: Router, @Inject(DOCUMENT) document: any) {
    this.document = <Document> document;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Some inputs changed, reset the pageScrollInstance
    this.pageScrollInstance = undefined;
  }

  ngOnDestroy(): void {
    if (this.pageScrollInstance) {
      this.pageScrollService.stop(this.pageScrollInstance);
    }
    return undefined;
  }

  private generatePageScrollInstance(): PageScrollInstance {
    if (this.pageScrollInstance === undefined || this.pageScrollInstance === null) {
      const options: PageScrollOptions = {
        document: this.document,
        scrollTarget: this.pageScrollTarget || this.href,
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
      this.pageScrollInstance = this.pageScrollService.newInstance(options);
    }
    return this.pageScrollInstance;
  }

  private pushRouterState() {
    if (this.pageScrollAdjustHash && typeof this.pageScrollInstance.pageScrollOptions.scrollTarget === 'string'
      && (<string>this.pageScrollInstance.pageScrollOptions.scrollTarget).substr(0, 1) === '#') {
      // "Navigate" to the current route again and this time set the fragment/hash
      this.router.navigate([], {
        fragment: (<string>this.pageScrollInstance.pageScrollOptions.scrollTarget).substr(1),
        preserveQueryParams: true
      });
    }
  }

  private scroll(): void {
    const pageScrollInstance = this.generatePageScrollInstance();
    this.pushRouterState();
    this.pageScrollService.start(pageScrollInstance);
  }

  public handleClick(clickEvent: Event): boolean { // tslint:disable-line:no-unused-variable
    if (this.routerLink && this.router !== null && this.router !== undefined) {
      let urlTree: UrlTree;
      if (typeof this.routerLink === 'string') {
        urlTree = this.router.parseUrl(this.routerLink);
      } else {
        urlTree = this.router.createUrlTree(this.routerLink);
      }
      if (!this.router.isActive(urlTree, true)) {
        // We need to navigate their first.
        // Navigation is handled by the routerLink directive
        // so we only need to listen for route change
        const subscription: Subscription = <Subscription>this.router.events.subscribe((routerEvent) => {
          if (routerEvent instanceof NavigationEnd) {
            subscription.unsubscribe();
            // use a timeout to start scrolling as soon as the stack is cleared
            setTimeout(() => {
              this.scroll();
            }, 0);
          } else if (routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
            subscription.unsubscribe();
          }
        });
        return false; // to preventDefault()
      }
    }
    this.scroll();
    return false; // to preventDefault()
  }
}




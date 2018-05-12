import {
    Directive,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
    Inject,
    Optional,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {
    Router,
    NavigationEnd,
    NavigationError,
    NavigationCancel,
    UrlTree
} from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { Subscription } from 'rxjs';

import { PageScrollService } from './ngx-page-scroll.service';
import { PageScrollInstance } from './ngx-page-scroll-instance';
import { PageScrollUtilService as Util } from './ngx-page-scroll-util.service';
import { EasingLogic } from './ngx-page-scroll-config';

@Directive({
    selector: '[pageScroll]',
    host: { // tslint:disable-line:use-host-property-decorator
        '(click)': 'handleClick($event)',
    }
})
export class PageScroll implements OnChanges, OnDestroy {

    @Input()
    public routerLink: any;

    @Input()
    public href: string;

    @Input()
    public pageScrollTarget: string = null;

    @Input()
    public pageScrollHorizontal: boolean = null;

    @Input()
    public pageScrollOffset: number = null;

    @Input()
    public pageScrollDuration: number = null;

    @Input()
    public pageScrollSpeed: number = null;

    @Input()
    public pageScrollEasing: EasingLogic = null;

    @Input()
    public pageScrollInterruptible: boolean;

    @Input()
    public pageScrollAdjustHash = false;

    @Input()
    public pageScroll: string = null;

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
        if (Util.isUndefinedOrNull(this.pageScrollInstance)) {
            this.pageScrollInstance = PageScrollInstance.newInstance({
                document: this.document,
                scrollTarget: this.pageScrollTarget || this.href,
                scrollingViews: null,
                namespace: this.pageScroll,
                verticalScrolling: !this.pageScrollHorizontal,
                pageScrollOffset: this.pageScrollOffset,
                pageScrollInterruptible: this.pageScrollInterruptible,
                pageScrollEasingLogic: this.pageScrollEasing,
                pageScrollDuration: this.pageScrollDuration,
                pageScrollSpeed: this.pageScrollSpeed,
                pageScrollFinishListener: this.pageScrollFinish
            });
        }
        return this.pageScrollInstance;
    }

    private pushRouterState() {
        if (this.pageScrollAdjustHash && typeof this.pageScrollInstance.scrollTarget === 'string'
            && (<string>this.pageScrollInstance.scrollTarget).substr(0, 1) === '#') {
            // "Navigate" to the current route again and this time set the fragment/hash
            this.router.navigate([], {
                fragment: (<string>this.pageScrollInstance.scrollTarget).substr(1),
                preserveQueryParams: true
            });
        }
    }

    private scroll(): void {
        let pageScrollInstance = this.generatePageScrollInstance();
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
                let subscription: Subscription = <Subscription>this.router.events.subscribe((routerEvent) => {
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

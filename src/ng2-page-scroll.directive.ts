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
import {DOCUMENT} from '@angular/platform-browser';

import {Subscription} from 'rxjs/Subscription';

import {PageScrollService} from './ng2-page-scroll.service';
import {PageScrollInstance} from './ng2-page-scroll-instance';
import {PageScrollUtilService} from './ng2-page-scroll-util.service';
import {EasingLogic} from './ng2-page-scroll-config';

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
    public pageScrollHorizontal: boolean = null;

    @Input()
    public pageScrollOffset: number = null;

    @Input()
    public pageScrollDuration: number = null;

    @Input()
    public pageScrollEasing: EasingLogic = null;

    @Input()
    public pageScrollInterruptible: boolean;

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
        if (PageScrollUtilService.isUndefinedOrNull(this.pageScrollInstance)) {
            this.pageScrollInstance = PageScrollInstance.newInstance({
                document: this.document,
                scrollTarget: this.href,
                scrollingViews: null,
                namespace: this.pageScroll,
                verticalScrolling: !this.pageScrollHorizontal,
                pageScrollOffset: this.pageScrollOffset,
                pageScrollInterruptible: this.pageScrollInterruptible,
                pageScrollEasingLogic: this.pageScrollEasing,
                pageScrollDuration: this.pageScrollDuration,
                pageScrollFinishListener: this.pageScrollFinish
            });
        }
        return this.pageScrollInstance;
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
                        this.pageScrollService.start(this.generatePageScrollInstance());
                    } else if (routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
                        subscription.unsubscribe();
                    }
                });
                return false; // to preventDefault()
            }
        }
        this.pageScrollService.start(this.generatePageScrollInstance());
        return false; // to preventDefault()
    }

}

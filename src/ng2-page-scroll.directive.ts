import {Directive, Input, Output, EventEmitter, OnDestroy, Inject} from '@angular/core';
import {Router, NavigationEnd, NavigationError, NavigationCancel} from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
import {IEasingFunction} from './ng2-page-scroll-config';
import {PageScrollManager} from './ng2-page-scroll-manager';
import {PageScrollService} from './ng2-page-scroll.service';

@Directive({
    selector: '[pageScroll]',
    host: { // tslint:disable-line:use-host-property-decorator
      '(click)': 'handleClick($event)',
    },
    providers: [PageScrollService]
})
export class PageScroll implements OnDestroy {

    @Input()
    public routerLink: any;

    @Input()
    public href: string;

    @Input()
    public pageScrollOffset: number = null;

    @Input()
    public pageScrollDuration: number = null;

    @Input()
    public pageScrollEasing: IEasingFunction = null;

    @Input()
    public pageScrollInterruptible: boolean;

    @Input()
    public pageScrollEnable: boolean = true;

    @Output()
    pageScrollFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

    private body: HTMLBodyElement;
    private scrollTopSources: any[];

    private interruptListenersAttached: boolean = false;

    constructor(private router: Router, @Inject(DOCUMENT) private document: any, private pageScrollService: PageScrollService) {
        this.body = document.body;
        this.scrollTopSources = [this.document.documentElement, this.body, this.document.body.parentNode];
    }

    ngOnDestroy(): any {
        if (this.interruptListenersAttached) {
            PageScrollManager.detachInterfereListeners(this.body);
        }
        return undefined;
    }

    private handleClick(clickEvent: Event): boolean { // tslint:disable-line:no-unused-variable
        if (!this.pageScrollEnable) {
            return false;
        }
        if (this.routerLink) {
            // We need to navigate their first.
            // Navigation is handled by the routerLink directive
            // so we only need to listen for route change
            // Note: the change event is also emitted when navigating to the current route again
            let subscription: Subscription = <Subscription>this.router.events.subscribe((routerEvent) => {
                if (routerEvent instanceof NavigationEnd) {
                    subscription.unsubscribe();
                    this.pageScrollService.scrollView(this.href,
                        this.scrollTopSources,
                        this.pageScrollOffset,
                        this.pageScrollInterruptible,
                        this.pageScrollEasing,
                        this.pageScrollDuration);
                } else if (routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
                    subscription.unsubscribe();
                }
            });
        } else {
            this.pageScrollService.scrollView(this.href,
                this.scrollTopSources,
                this.pageScrollOffset,
                this.pageScrollInterruptible,
                this.pageScrollEasing,
                this.pageScrollDuration);
        }
        return false; // to preventDefault()
    }

}

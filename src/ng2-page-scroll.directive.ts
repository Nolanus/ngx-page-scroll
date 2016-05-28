import {Directive, ElementRef, Input, Output, EventEmitter, HostListener, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {PageScrollConfig, IEasingFunction} from './ng2-page-scroll-config';
import {PageScrollManager} from './ng2-page-scroll-manager';

@Directive({
    selector: '[pageScroll]'
})
export class PageScroll implements OnDestroy {

    @Input()
    public routerLink:any;

    @Input()
    public href:string;

    @Input()
    public pageScrollOffset:number = null;

    @Input()
    public pageScrollDuration:number = null;

    @Input()
    public pageScrollEasing:IEasingFunction = null;

    @Input()
    public pageScrollInterruptible:boolean;

    @Output()
    pageScrollFinish:EventEmitter<boolean> = new EventEmitter();

    private document:Document;
    private body:HTMLBodyElement;

    private timer:any = null;
    private interruptListenersAttached:boolean = false;


    constructor(private el:ElementRef, private router:Router) {
        this.document = el.nativeElement.ownerDocument;
        this.body = el.nativeElement.ownerDocument.body;
    }

    ngOnDestroy():any {
        // Remove scrollInterfere listeners, if none are attached it doesn't hurt
        PageScrollManager.detachInterfereListeners(this.body);
        return undefined;
    }

    public stop():boolean {
        return this.stopInternal(true);
    }

    @HostListener('click', ['$event'])
    private handleClick(event:Event):boolean {
        if (this.routerLink) {
            // We need to navigate their first.
            // Navigation is handled by the routerLink directive
            // so we only need to listen for route change
            // Note: the change event is also emitted when navigating to the current route again
            let subscription:Subscription = <Subscription>this.router.changes.subscribe(() => {
                subscription.unsubscribe();
                this.scrollView(this.href);
            });
        } else {
            this.scrollView(this.href);
        }
        return false; // to preventDefault()
    }

    private scrollView(anchor:string):void {
        let anchorTarget:HTMLElement = this.document.getElementById(anchor.substr(1));

        if (anchorTarget === null) {
            // Target not found, so stop
            return;
        }
        let targetScrollTop:number = anchorTarget.offsetTop;
        let startScrollTop:number = (this.document.documentElement.scrollTop || this.body.scrollTop);
        let distanceToScroll:number = targetScrollTop - startScrollTop;

        if (distanceToScroll === 0) {
            // We're at the final destination already, so stop
            return;
        }
        // Stop all possibly running scroll animations
        PageScrollManager.stopAll();

        let startTime:number = new Date().getTime();

        let intervalConf:any = {
            startScrollTop: startScrollTop,
            targetScrollTop: distanceToScroll - (this.pageScrollOffset === null ? PageScrollConfig.defaultScrollOffset : this.pageScrollOffset),
            startTime: startTime,
            easing: this.pageScrollEasing === null ? PageScrollConfig.defaultEasingFunction : this.pageScrollEasing
        };
        intervalConf.duration = this.pageScrollDuration === null ? PageScrollConfig.defaultDuration : this.pageScrollDuration;
        intervalConf.endTime = intervalConf.startTime + intervalConf.duration;

        // Register the interrupt listeners if we want an interruptible scroll animation
        if (this.pageScrollInterruptible || (typeof this.pageScrollInterruptible === 'undefined' && PageScrollConfig.defaultInterruptible)) {
            PageScrollManager.attachInterfereListeners(this.body);
            this.interruptListenersAttached = true;
        }

        this.timer = setInterval((intervalConf:any) => {
            let currentTime:number = new Date().getTime();
            let newScrollTop:number;

            if (intervalConf.endTime <= currentTime) {
                this.stopInternal(false);
                newScrollTop = intervalConf.targetScrollTop;
            } else {
                newScrollTop = intervalConf.easing(
                currentTime - intervalConf.startTime,
                intervalConf.startScrollTop,
                intervalConf.targetScrollTop,
                intervalConf.duration);
            }
            this.body.scrollTop = newScrollTop;
            this.document.documentElement.scrollTop = newScrollTop;
        }, PageScrollConfig._interval, intervalConf);

        // Register the instance as running one
        PageScrollManager.add(this);
    }

    private stopInternal(interrupted:boolean):boolean {
        PageScrollManager.remove(this);

        if (this.interruptListenersAttached) {
            PageScrollManager.detachInterfereListeners(this.body);
        }

        if (this.timer) {
            clearInterval(this.timer);
            this.pageScrollFinish.emit(!interrupted);
            return true;
        }
        return false;
    }
}

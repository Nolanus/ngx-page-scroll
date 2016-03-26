/**
 * Created by sebastianfuss on 06.03.16.
 */
import {Directive, ElementRef, Input, Output, EventEmitter, HostListener, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';
import {Subscription} from 'rxjs/Subscription';

@Directive({
    selector: '[pageScroll]'
})
export class PageScroll implements OnDestroy {

    @Input()
    public routerLink:any;

    @Input()
    public href:string;

    @Input()
    public pageScrollOffset:number = 0;

    @Input()
    public pageScrollDuration:number = 1250;

    @Output()
    scrollFinish:EventEmitter<any> = new EventEmitter();

    private document:Document;
    private body:HTMLBodyElement;
    private static timers:any[] = [];
    private static listener = (event:Event) => {
        // Stop the scroll animation if the user interferes with it
        if (event.type !== 'keyup' || [33, 34, 35, 36, 38, 40].indexOf((<KeyboardEvent>event).keyCode) >= 0) {
            PageScroll.stopTimers();
        }
    };
    private static interfereEvents:string[] = ['mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup', 'touchmove'];

    constructor(private el:ElementRef, private router:Router) {
        this.document = el.nativeElement.ownerDocument;
        this.body = el.nativeElement.ownerDocument.body;
        PageScroll.interfereEvents.forEach((event:string) => this.body.addEventListener(event, PageScroll.listener));
    }

    ngOnDestroy():any {
        PageScroll.interfereEvents.forEach((event:string) => this.body.removeEventListener(event, PageScroll.listener));
        return undefined;
    }

    @HostListener('click', ['$event'])
    private handleClick(event:Event):boolean {
        event.preventDefault();
        if (this.routerLink) {
            // Check whether we are at the target page already
            if (this.router.isRouteActive(this.router.generate(this.routerLink))) {
                // We're already at the correct screen
                this.scrollView(this.href);
            } else {
                // We need to navigate their first.
                // Navigation is handled by the routerLink directive
                // so we only need to listen for route change
                this.body.scrollTop = 0;
                let subscription:Subscription = <Subscription>this.router.subscribe(() => {
                    subscription.unsubscribe();
                    this.scrollView(this.href);
                });
            }
        } else {
            this.scrollView(this.href);
        }
        return false; // to preventDefault()
    }

    private scrollView(anchor:string):void {
        let anchorTarget:HTMLElement = this.document.getElementById(anchor.substr(1));

        if (anchorTarget !== null) {
            let targetScrollTop:number = anchorTarget.offsetTop;
            let distanceToScroll:number = targetScrollTop - this.body.scrollTop;

            if (distanceToScroll !== 0) {
                PageScroll.stopTimers();
                let startTime:number = new Date().getTime();
                let timer:any = setInterval((startScrollTop:number, targetScrollTop:number,
                                             startTime:number, endTime:number, duration:number) => {
                    let currentTime:number = new Date().getTime();
                    this.body.scrollTop = PageScroll.easeInOutExpo(0, currentTime - startTime,
                        startScrollTop, targetScrollTop, duration);
                    if (endTime <= currentTime) {
                        PageScroll.stopTimer(timer);
                        this.scrollFinish.emit(null);
                    }
                }, 10, this.body.scrollTop, distanceToScroll - this.pageScrollOffset, startTime,
                    startTime + this.pageScrollDuration, this.pageScrollDuration);

                PageScroll.timers.push(timer);
            }
        }
    }

    // t: current time, b: beginning value, c: change In value, d: duration
    private static easeInOutExpo(x:number, t:number, b:number, c:number, d:number):number {
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }

    private static stopTimers():boolean {
        if (PageScroll.timers.length > 0) {
            PageScroll.timers.forEach((timer:any, index:number) => {
                clearInterval(timer);
                PageScroll.timers.splice(index, 1);
            });
            return true;
        }
        return false;
    }

    private static stopTimer(timer:any):boolean {
        clearInterval(timer);
        let index:number = PageScroll.timers.indexOf(timer);
        if (index >= 0) {
            PageScroll.timers.splice(index, 1);
            return true;
        }
        return false;
    }
}

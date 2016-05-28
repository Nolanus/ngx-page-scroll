import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {PageScroll, IEasingFunction} from 'ng2-page-scroll';

@Component({
    templateUrl: './app/front.component.html',
    directives: [ROUTER_DIRECTIVES, PageScroll]
})
export class FrontComponent {
    myEasing:IEasingFunction = (t:number, b:number, c:number, d:number):number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    doSmth(reachedTarget:boolean) {
        if (reachedTarget){
            console.log('Yeah, we reached our destination');
        } else {
            console.log('Ohoh, something interrupted us');
        }
    }
}
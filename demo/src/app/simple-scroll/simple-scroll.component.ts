import {Component, OnInit, Inject} from '@angular/core';
import {PageScrollInstance, PageScrollService} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';
import {EasingLogic} from 'ng2-page-scroll';

@Component({
    selector: 'app-simple-scroll',
    templateUrl: './simple-scroll.component.html',
    styleUrls: ['./simple-scroll.component.css']
})
export class SimpleScrollComponent implements OnInit {

    public constructor(@Inject(DOCUMENT) private document: Document, private pageScrollService: PageScrollService) {
    }

    ngOnInit() {
    }

    public goToLastHeading() {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#head11');
        this.pageScrollService.start(pageScrollInstance);
    }

    public array: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    public myEasing: EasingLogic = {
        ease: (t: number, b: number, c: number, d: number): number => {
            // easeInOutExpo easing
            if (t === 0) return b;
            if (t === d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    };

    public doSmth(reachedTarget: boolean) {
        if (reachedTarget) {
            alert('Yeah, we reached our destination');
        } else {
            alert('Ohoh, something interrupted us');
        }
    }

}

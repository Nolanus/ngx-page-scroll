import {Component, OnInit, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {MdSnackBar} from '@angular/material';
import {PageScrollInstance, PageScrollService, EasingLogic} from 'ng2-page-scroll';

@Component({
  selector: 'app-simple-scroll',
  templateUrl: './simple-scroll.component.html',
  styleUrls: ['./simple-scroll.component.css'],
  providers: [MdSnackBar]
})
export class SimpleScrollComponent implements OnInit {

  public constructor(@Inject(DOCUMENT) private document: any,
                     private pageScrollService: PageScrollService,
                     private snackBar: MdSnackBar) {
  }

  ngOnInit() {
  }

  public goToLastHeading() {
    // You may use any valid css selector as scroll target (e.g. ids, class selectors, tags, combinations of those, ...)
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '.theEnd');
    this.pageScrollService.start(pageScrollInstance);
  }

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
    let text: string;
    if (reachedTarget) {
      text = 'Yeah, we reached our destination';
    } else {
      text = 'Ohoh, something interrupted us';
    }
    this.snackBar.open(text, 'Ok');
  }

  public dynamicTargets = ['#head7', '#head10', '#head14'];
  public dynamicSelectedTarget = this.dynamicTargets[0];

}

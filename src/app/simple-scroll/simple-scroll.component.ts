import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EasingLogic, PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-simple-scroll',
  templateUrl: './simple-scroll.component.html',
  styleUrls: ['./simple-scroll.component.scss'],
  providers: [MatSnackBar],
  standalone: false
})
export class SimpleScrollComponent implements OnInit {

  public dynamicTargets = ['#head7', '#head10', '#head14'];
  public dynamicSelectedTarget = this.dynamicTargets[0];

  public myEasing: EasingLogic = (t: number, b: number, c: number, d: number): number => {
    // easeInOutExpo easing
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    // tslint:disable-next-line:no-conditional-assignment
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }

    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }

  public constructor(@Inject(DOCUMENT) private readonly document: Document,
                     private readonly pageScrollService: PageScrollService,
                     private readonly snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public goToLastHeading(): void {
    // You may use any valid css selector as scroll target (e.g. ids, class selectors, tags, combinations of those, ...)
    // const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '.theEnd');
    const subscriber = new EventEmitter<boolean>();
    subscriber.subscribe((val) => {
      // Reached last heading
    });
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.theEnd',
      scrollFinishListener: subscriber,
    });
  }

  public doSmth(reachedTarget: boolean): void {
    let text: string;
    if (reachedTarget) {
      text = 'Yeah, we reached our destination';
    } else {
      text = 'Ohoh, something interrupted us';
    }
    this.snackBar.open(text, 'Ok');
  }

}

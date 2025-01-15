import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-pathological-tests',
    templateUrl: './pathological-tests.component.html',
    styleUrls: ['./pathological-tests.component.scss'],
    providers: [MatSnackBar],
    standalone: false
})
export class PathologicalTestsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public scheduleInterrupt(): void {
    setTimeout(() => {
      const event = new WheelEvent('mousewheel', {bubbles: true});
      this.document.body.dispatchEvent(event);
    }, 500);
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

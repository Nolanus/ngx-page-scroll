import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pathological-tests',
  templateUrl: './pathological-tests.component.html',
  styleUrls: ['./pathological-tests.component.css'],
  providers: [MatSnackBar]
})
export class PathologicalTestsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any,
              private renderer: Renderer,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  public scheduleInterrupt(): void {
    setTimeout(() => {
      const event = new WheelEvent('mousewheel', {bubbles: true});
      this.renderer.invokeElementMethod(this.document.body, 'dispatchEvent', [event]);
    }, 500);
  }


  public doSmth(reachedTarget: boolean) {
    let text: string;
    if (reachedTarget) {
      text = 'Yeah, we reached our destination';
    } else {
      text = 'Ohoh, something interrupted us';
    }
    this.snackBar.open(text, 'Ok');
  }

}

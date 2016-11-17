import {Component, OnInit, Renderer, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';

@Component({
    selector: 'app-pathological-tests',
    templateUrl: './pathological-tests.component.html',
    styleUrls: ['./pathological-tests.component.css'],
    providers: [MdSnackBar]
})
export class PathologicalTestsComponent implements OnInit {

    constructor(@Inject(DOCUMENT) private document: any,
                private renderer: Renderer,
                private snackBar: MdSnackBar) {
    }

    ngOnInit() {
    }

    public scheduleInterrupt(): void {
        setTimeout(() => {
            let event = new WheelEvent('mousewheel', {bubbles: true});
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

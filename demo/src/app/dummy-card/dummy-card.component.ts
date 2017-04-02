import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-dummy-card',
  templateUrl: './dummy-card.component.html',
})
export class DummyCardComponent implements OnChanges {

  @Input() start: number;
  @Input() length: number;
  @Input() idPrefix: string = 'head';
  @Input() headings: boolean = true;
  @Input() scrollButtons: boolean = true;

  public array: number[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.array = Array.from(Array(this.length), (e, i) => i + this.start);
  }

}

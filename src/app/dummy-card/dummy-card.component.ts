import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-dummy-card',
    templateUrl: './dummy-card.component.html',
    standalone: false
})
export class DummyCardComponent implements OnChanges {

  @Input() start: number;
  @Input() length: number;
  @Input() idPrefix = 'head';
  @Input() headings = true;
  @Input() scrollButtons = true;

  public array: number[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.array = Array.from(Array(this.length), (e, i) => i + this.start);
  }

}

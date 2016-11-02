import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translated-target-scroll',
  templateUrl: './translated-target-scroll.component.html',
  styleUrls: ['./translated-target-scroll.component.css']
})
export class TranslatedTargetScrollComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public array: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

}

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NgFor} from '@angular/common';

import {PageScroll, PageScrollService} from 'ng2-page-scroll';

@Component({
  templateUrl: './app/lipsum.component.html',
  directives: [PageScroll, NgFor, ROUTER_DIRECTIVES],
  providers: [PageScrollService]
})
export class LipsumComponent {
  array: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  constructor(private pageScrollService: PageScrollService) {

  }
  goToAnchorHead11() {
    this.pageScrollService.scrollView('#head11');
  };
}

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.css']
})
export class HorizontalScrollComponent implements OnInit {

  @ViewChild('container')
  public container: ElementRef;

  constructor(@Inject(DOCUMENT) private document: any, private pageScrollService: PageScrollService) {
  }

  public scrollHorizontalStart() {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#horizontalContainerStart',
      scrollingViews: [this.container.nativeElement],
      verticalScrolling: false
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  public scrollHorizontal() {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#inHorizontalContainer',
      scrollingViews: [this.container.nativeElement],
      verticalScrolling: false
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  ngOnInit() {
  }

}

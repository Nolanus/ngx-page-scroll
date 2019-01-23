import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.css'],
})
export class HorizontalScrollComponent implements OnInit {

  @ViewChild('container')
  public container: ElementRef;

  constructor(@Inject(DOCUMENT) private document: any, private pageScrollService: PageScrollService) {
  }

  public scrollHorizontalStart() {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '#horizontalContainerStart',
      scrollViews: [this.container.nativeElement],
      verticalScrolling: false,
    });
  }

  public scrollHorizontal() {
    const pageScrollInstance: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      scrollTarget: '#inHorizontalContainer',
      scrollViews: [this.container.nativeElement],
      verticalScrolling: false,
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  ngOnInit() {
  }

}

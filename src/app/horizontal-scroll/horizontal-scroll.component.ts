import { Component, ElementRef, OnInit, ViewChild, DOCUMENT, inject } from '@angular/core';

import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll-core';

@Component({
    selector: 'app-horizontal-scroll',
    templateUrl: './horizontal-scroll.component.html',
    styleUrls: ['./horizontal-scroll.component.scss'],
    standalone: false
})
export class HorizontalScrollComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly pageScrollService = inject(PageScrollService);


  @ViewChild('container')
  public container: ElementRef;

  public scrollHorizontalStart(): void {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '#horizontalContainerStart',
      scrollViews: [this.container.nativeElement],
      verticalScrolling: false,
    });
  }

  public scrollHorizontal(): void {
    const pageScrollInstance: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      scrollTarget: '#inHorizontalContainer',
      scrollViews: [this.container.nativeElement],
      verticalScrolling: false,
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  ngOnInit(): void {
  }

}

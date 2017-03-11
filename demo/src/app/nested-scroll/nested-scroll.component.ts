import {Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
  selector: 'app-nested-scroll',
  templateUrl: './nested-scroll.component.html',
  styleUrls: ['./nested-scroll.component.css']
})
export class NestedScrollComponent implements OnInit {

  @ViewChild('basicContainer')
  public basicContainer: ElementRef;

  @ViewChild('complexContainer')
  public complexContainer: ElementRef;

  constructor(@Inject(DOCUMENT) private document: any, private pageScrollService: PageScrollService) {
  }

  ngOnInit() {
  }

  public scrollInsideBasic() {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#basicScrollTarget',
      scrollingViews: [this.basicContainer.nativeElement]
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  public scrollInsideComplex() {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#complexScrollTarget',
      scrollingViews: [this.complexContainer.nativeElement],
      advancedInlineOffsetCalculation: true
    });
    this.pageScrollService.start(pageScrollInstance);
  }
}

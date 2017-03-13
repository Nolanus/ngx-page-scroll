import {Component, OnInit, ViewChild, ElementRef, Inject} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {PageScrollService, PageScrollInstance} from  'ng2-page-scroll';

@Component({
  selector: 'app-namespace-scroll',
  templateUrl: './namespace-scroll.component.html',
  styleUrls: ['./namespace-scroll.component.css']
})
export class NamespaceScrollComponent implements OnInit {

  @ViewChild('container1')
  public container1: ElementRef;

  @ViewChild('container2')
  public container2: ElementRef;

  @ViewChild('container3')
  public container3: ElementRef;

  @ViewChild('container4')
  public container4: ElementRef;

  constructor(@Inject(DOCUMENT) private document: any, public pageScrollService: PageScrollService) {
  }

  ngOnInit() {
  }

  public startDefaultNamespaceScrolls() {
    let pageScrollInstance1: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      pageScrollDuration: 10000,
      scrollTarget: '#scrollTarget1',
      scrollingViews: [this.container1.nativeElement]
    });

    let pageScrollInstance2: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      pageScrollDuration: 10000,
      scrollTarget: '#scrollTarget2',
      scrollingViews: [this.container2.nativeElement]
    });

    this.pageScrollService.start(pageScrollInstance1);
    this.pageScrollService.start(pageScrollInstance2);
  }

  public resetDefaultNameScrolls() {
    // Jump to the top inside each container
    let pageScrollInstance1: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      pageScrollDuration: 0,
      scrollTarget: '#container1Head',
      scrollingViews: [this.container1.nativeElement]
    });

    let pageScrollInstance2: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      pageScrollDuration: 0,
      scrollTarget: '#container2Head',
      scrollingViews: [this.container2.nativeElement]
    });

    this.pageScrollService.start(pageScrollInstance1);
    this.pageScrollService.start(pageScrollInstance2);
  }

  public startCustomNamespaceScroll() {
    let pageScrollInstance3: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      pageScrollDuration: 10000,
      namespace: 'customSpace',
      scrollTarget: '#scrollTarget3',
      scrollingViews: [this.container3.nativeElement]
    });

    this.pageScrollService.start(pageScrollInstance3);
  }

  public resetCustomNamespaceScroll() {
    let pageScrollInstance3: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      pageScrollDuration: 0,
      namespace: 'customSpace',
      scrollTarget: '#container3Head',
      scrollingViews: [this.container3.nativeElement]
    });

    this.pageScrollService.start(pageScrollInstance3);
  }

  public stopDefaultNamespaceScrolls() {
    this.pageScrollService.stopAll('default');
  }

  public stopCustomNamespaceScrolls() {
    this.pageScrollService.stopAll('customSpace');
  }

  public stopAllNamespaceScrolls() {
    this.pageScrollService.stopAll();
  }

}

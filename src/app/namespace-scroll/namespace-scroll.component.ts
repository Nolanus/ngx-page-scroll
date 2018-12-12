import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll-core';

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
    const pageScrollInstance1: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      duration: 10000,
      scrollTarget: '#scrollTarget1',
      scrollViews: [this.container1.nativeElement]
    });

    const pageScrollInstance2: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      duration: 10000,
      scrollTarget: '#scrollTarget2',
      scrollViews: [this.container2.nativeElement]
    });

    this.pageScrollService.start(pageScrollInstance1);
    this.pageScrollService.start(pageScrollInstance2);
  }

  public resetDefaultNameScrolls() {
    // Jump to the top inside each container
    const pageScrollInstance1: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      duration: 0,
      scrollTarget: '#container1Head',
      scrollViews: [this.container1.nativeElement]
    });

    const pageScrollInstance2: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      duration: 0,
      scrollTarget: '#container2Head',
      scrollViews: [this.container2.nativeElement]
    });

    this.pageScrollService.start(pageScrollInstance1);
    this.pageScrollService.start(pageScrollInstance2);
  }

  public startCustomNamespaceScroll() {
    this.pageScrollService.scroll({
      document: this.document,
      duration: 10000,
      namespace: 'customSpace',
      scrollTarget: '#scrollTarget3',
      scrollViews: [this.container3.nativeElement]
    });
  }

  public resetCustomNamespaceScroll() {
    this.pageScrollService.scroll({
      document: this.document,
      duration: 0,
      namespace: 'customSpace',
      scrollTarget: '#container3Head',
      scrollViews: [this.container3.nativeElement]
    });
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

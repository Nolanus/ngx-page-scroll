import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import { MatDialog } from '@angular/material';

import { DialogScrollDialog } from './dialog-scroll.dialog.component';

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

  constructor(@Inject(DOCUMENT) private document: any, private pageScrollService: PageScrollService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogScrollDialog, {width: '450px', autoFocus: false});


    dialogRef.afterOpen().subscribe(() => {
      dialogRef.componentInstance.scrollIt();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public scrollInsideBasic() {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#basicScrollTarget',
      scrollingViews: [this.basicContainer.nativeElement]
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  public scrollInsideComplex() {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#complexScrollTarget',
      scrollingViews: [this.complexContainer.nativeElement],
      advancedInlineOffsetCalculation: true
    });
    this.pageScrollService.start(pageScrollInstance);
  }
}

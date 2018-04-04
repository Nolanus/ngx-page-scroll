import { Component, Inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DOCUMENT } from '@angular/common';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll';

@Component({
  selector: 'dialog-scroll-dialog',
  templateUrl: 'dialog-scroll.dialog.component.html',
  styleUrls: ['./dialog-scroll.dialog.component.css'],
})
export class DialogScrollDialog implements OnInit {

  @ViewChild('dialogScrollingContainer')
  public scrollingView: ElementRef;

  private pageScrollInstance: PageScrollInstance;

  constructor(public dialogRef: MatDialogRef<DialogScrollDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit(): void {
    this.pageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#dialogScrollTarget',
      scrollingViews: [this.scrollingView.nativeElement]
    });

  }

  public scrollIt() {
    this.pageScrollService.start(this.pageScrollInstance);
  }

  closeClick(): void {
    this.dialogRef.close();
    this.pageScrollService.stop(this.pageScrollInstance);
  }

}

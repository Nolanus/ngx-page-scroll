import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, DOCUMENT, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll-core';

@Component({
    selector: 'app-scroll-dialog',
    templateUrl: './scroll-dialog.component.html',
    styleUrls: ['./scroll-dialog.component.scss'],
    standalone: false
})
export class ScrollDialogComponent implements OnInit, AfterViewInit {
  dialogRef = inject<MatDialogRef<ScrollDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  private readonly pageScrollService = inject(PageScrollService);
  private readonly document = inject(DOCUMENT);


  @ViewChild('dialogScrollingContainer')
  public scrollingView: ElementRef;

  private pageScrollInstance: PageScrollInstance;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.pageScrollInstance = this.pageScrollService.create({
      document: this.document,
      scrollTarget: '#dialogScrollTarget',
      scrollViews: [this.scrollingView.nativeElement],
    });
  }

  public scrollIt(): void {
    this.pageScrollService.start(this.pageScrollInstance);
  }

  closeClick(): void {
    this.dialogRef.close();
    this.pageScrollService.stop(this.pageScrollInstance);
  }

}

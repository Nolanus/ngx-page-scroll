import { Component, ElementRef, OnInit, ViewChild, DOCUMENT, inject } from '@angular/core';

import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll-core';
import { MatDialog } from '@angular/material/dialog';
import { ScrollDialogComponent } from '../scroll-dialog/scroll-dialog.component';

@Component({
    selector: 'app-nested-scroll',
    templateUrl: './nested-scroll.component.html',
    styleUrls: ['./nested-scroll.component.scss'],
    standalone: false
})
export class NestedScrollComponent implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly pageScrollService = inject(PageScrollService);
  readonly dialog = inject(MatDialog);


  @ViewChild('basicContainer')
  public basicContainer: ElementRef;

  @ViewChild('complexContainer')
  public complexContainer: ElementRef;

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ScrollDialogComponent, {width: '450px', autoFocus: false});

    dialogRef.afterOpened().subscribe(() => {
      dialogRef.componentInstance.scrollIt();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public scrollInsideBasic(): void {
    const pageScrollInstance: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      scrollTarget: '#basicScrollTarget',
      scrollViews: [this.basicContainer.nativeElement],
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  public scrollInsideComplex(): void {
    const pageScrollInstance: PageScrollInstance = this.pageScrollService.create({
      document: this.document,
      scrollTarget: '#complexScrollTarget',
      scrollViews: [this.complexContainer.nativeElement],
      advancedInlineOffsetCalculation: true,
    });
    this.pageScrollService.start(pageScrollInstance);
  }
}

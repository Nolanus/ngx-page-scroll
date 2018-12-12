import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService, PageScrollInstance } from 'ngx-page-scroll-core';
import { MatDialog } from '@angular/material';

import { ScrollDialogComponent } from './scroll.dialog.component';

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
        const dialogRef = this.dialog.open(ScrollDialogComponent, {width: '450px', autoFocus: false});


        dialogRef.afterOpened().subscribe(() => {
            dialogRef.componentInstance.scrollIt();
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    public scrollInsideBasic() {
        const pageScrollInstance: PageScrollInstance = this.pageScrollService.create({
            document: this.document,
            scrollTarget: '#basicScrollTarget',
            scrollViews: [this.basicContainer.nativeElement]
        });
        this.pageScrollService.start(pageScrollInstance);
    }

    public scrollInsideComplex() {
        const pageScrollInstance: PageScrollInstance = this.pageScrollService.create({
            document: this.document,
            scrollTarget: '#complexScrollTarget',
            scrollViews: [this.complexContainer.nativeElement],
            advancedInlineOffsetCalculation: true
        });
        this.pageScrollService.start(pageScrollInstance);
    }
}

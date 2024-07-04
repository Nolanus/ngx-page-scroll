import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';

import { ScrollDialogComponent } from './scroll-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

describe('ScrollDialogComponent', () => {
  let component: ScrollDialogComponent;
  let fixture: ComponentFixture<ScrollDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollDialogComponent, DummyCardComponent, DummyContentComponent],
      imports: [MatDialogModule, MatCardModule, MatIconModule, MatChipsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

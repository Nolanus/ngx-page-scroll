import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedScrollComponent } from './nested-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';

describe('NestedScrollComponent', () => {
  let component: NestedScrollComponent;
  let fixture: ComponentFixture<NestedScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NestedScrollComponent, DummyContentComponent, DummyCardComponent],
      imports: [MatDialogModule, MatCardModule],
      providers: [{provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

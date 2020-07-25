import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedScrollComponent } from './nested-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { MatDialogModule } from '@angular/material/dialog';

describe('NestedScrollComponent', () => {
  let component: NestedScrollComponent;
  let fixture: ComponentFixture<NestedScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NestedScrollComponent],
      imports: [MatDialogModule],
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

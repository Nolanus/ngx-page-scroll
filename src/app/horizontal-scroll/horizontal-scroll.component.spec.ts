import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollComponent } from './horizontal-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { MatCardModule } from '@angular/material/card';

describe('HorizontalScrollComponent', () => {
  let component: HorizontalScrollComponent;
  let fixture: ComponentFixture<HorizontalScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalScrollComponent],
      imports: [MatCardModule],
      providers: [{provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

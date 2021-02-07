import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleScrollComponent } from './simple-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';

describe('SimpleScrollComponent', () => {
  let component: SimpleScrollComponent;
  let fixture: ComponentFixture<SimpleScrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleScrollComponent, DummyCardComponent],
      imports: [OverlayModule, MatCardModule],
      providers: [{ provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleScrollComponent } from './simple-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxPageScrollDirective } from 'ngx-page-scroll';

describe('SimpleScrollComponent', () => {
  let component: SimpleScrollComponent;
  let fixture: ComponentFixture<SimpleScrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleScrollComponent, DummyCardComponent, NgxPageScrollDirective, DummyContentComponent],
      imports: [OverlayModule, MatCardModule, MatSelectModule, BrowserAnimationsModule, FormsModule],
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

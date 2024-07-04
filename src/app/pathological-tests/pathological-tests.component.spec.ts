import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PathologicalTestsComponent } from './pathological-tests.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxPageScrollDirective } from 'ngx-page-scroll';

describe('PathologicalTestsComponent', () => {
  let component: PathologicalTestsComponent;
  let fixture: ComponentFixture<PathologicalTestsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PathologicalTestsComponent, NgxPageScrollDirective, DummyCardComponent, DummyContentComponent],
      imports: [OverlayModule, MatCardModule, MatIconModule, MatSelectModule],
      providers: [{ provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologicalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

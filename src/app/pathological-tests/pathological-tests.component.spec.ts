import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologicalTestsComponent } from './pathological-tests.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';

describe('PathologicalTestsComponent', () => {
  let component: PathologicalTestsComponent;
  let fixture: ComponentFixture<PathologicalTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PathologicalTestsComponent],
      imports: [OverlayModule, MatCardModule],
      providers: [{provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig}],
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

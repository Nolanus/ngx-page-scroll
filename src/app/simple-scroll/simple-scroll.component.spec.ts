import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleScrollComponent } from './simple-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { OverlayModule } from '@angular/cdk/overlay';

describe('SimpleScrollComponent', () => {
  let component: SimpleScrollComponent;
  let fixture: ComponentFixture<SimpleScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleScrollComponent],
      imports: [OverlayModule],
      providers: [{provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig}],
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

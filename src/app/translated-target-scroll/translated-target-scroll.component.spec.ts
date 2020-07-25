import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatedTargetScrollComponent } from './translated-target-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';

describe('TranslatedTargetScrollComponent', () => {
  let component: TranslatedTargetScrollComponent;
  let fixture: ComponentFixture<TranslatedTargetScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatedTargetScrollComponent ],
      providers: [{provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatedTargetScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

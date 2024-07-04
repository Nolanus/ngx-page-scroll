import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslatedTargetScrollComponent } from './translated-target-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';

describe('TranslatedTargetScrollComponent', () => {
  let component: TranslatedTargetScrollComponent;
  let fixture: ComponentFixture<TranslatedTargetScrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TranslatedTargetScrollComponent, DummyContentComponent, DummyCardComponent],
      imports: [MatCardModule],
      providers: [{ provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig }],
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterScrollComponent } from './router-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';

describe('RouterScrollComponent', () => {
  let component: RouterScrollComponent;
  let fixture: ComponentFixture<RouterScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RouterScrollComponent, DummyCardComponent],
      imports: [MatCardModule],
      providers: [{provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

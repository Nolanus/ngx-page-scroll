import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RouterScrollComponent } from './router-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';
import { RouterModule, provideRouter } from '@angular/router';

describe('RouterScrollComponent', () => {
  let component: RouterScrollComponent;
  let fixture: ComponentFixture<RouterScrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RouterScrollComponent, DummyCardComponent, DummyContentComponent],
      imports: [MatCardModule, RouterModule],
      providers: [{ provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig }, provideRouter([])],
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

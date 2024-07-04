import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { NgxPageScrollDirective } from 'ngx-page-scroll';
import { NGXPS_CONFIG, defaultPageScrollConfig } from 'ngx-page-scroll-core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,NgxPageScrollDirective],
      imports: [MatCardModule],
      providers:[{provide:NGXPS_CONFIG,useValue:defaultPageScrollConfig}] 
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

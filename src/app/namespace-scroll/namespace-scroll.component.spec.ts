import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NamespaceScrollComponent } from './namespace-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';
import { MatIconModule } from '@angular/material/icon';

describe('NamespaceScrollComponent', () => {
  let component: NamespaceScrollComponent;
  let fixture: ComponentFixture<NamespaceScrollComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NamespaceScrollComponent, DummyCardComponent, DummyContentComponent],
      imports: [MatCardModule, MatIconModule],
      providers: [{ provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamespaceScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

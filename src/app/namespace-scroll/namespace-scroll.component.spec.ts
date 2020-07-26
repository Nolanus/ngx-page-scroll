import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamespaceScrollComponent } from './namespace-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';
import { MatCardModule } from '@angular/material/card';
import { DummyCardComponent } from '../dummy-card/dummy-card.component';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';

describe('NamespaceScrollComponent', () => {
  let component: NamespaceScrollComponent;
  let fixture: ComponentFixture<NamespaceScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NamespaceScrollComponent, DummyCardComponent, DummyContentComponent],
      imports: [MatCardModule],
      providers: [{provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig}],
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

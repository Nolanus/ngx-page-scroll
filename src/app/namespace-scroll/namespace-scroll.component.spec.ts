import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamespaceScrollComponent } from './namespace-scroll.component';
import { defaultPageScrollConfig, NGXPS_CONFIG } from 'ngx-page-scroll-core';

describe('NamespaceScrollComponent', () => {
  let component: NamespaceScrollComponent;
  let fixture: ComponentFixture<NamespaceScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamespaceScrollComponent ],
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

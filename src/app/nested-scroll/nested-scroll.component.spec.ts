import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedScrollComponent } from './nested-scroll.component';

describe('NestedScrollComponent', () => {
  let component: NestedScrollComponent;
  let fixture: ComponentFixture<NestedScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

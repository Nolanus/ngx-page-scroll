import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyCardComponent } from './dummy-card.component';

describe('DummyCardComponent', () => {
  let component: DummyCardComponent;
  let fixture: ComponentFixture<DummyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyCardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

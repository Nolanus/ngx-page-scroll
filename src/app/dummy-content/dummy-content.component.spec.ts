import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DummyContentComponent } from './dummy-content.component';

describe('DummyContentComponent', () => {
  let component: DummyContentComponent;
  let fixture: ComponentFixture<DummyContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DummyContentComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

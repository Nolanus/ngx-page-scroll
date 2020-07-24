import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologicalTestsComponent } from './pathological-tests.component';

describe('PathologicalTestsComponent', () => {
  let component: PathologicalTestsComponent;
  let fixture: ComponentFixture<PathologicalTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathologicalTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologicalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

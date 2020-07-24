import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleScrollComponent } from './simple-scroll.component';

describe('SimpleScrollComponent', () => {
  let component: SimpleScrollComponent;
  let fixture: ComponentFixture<SimpleScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

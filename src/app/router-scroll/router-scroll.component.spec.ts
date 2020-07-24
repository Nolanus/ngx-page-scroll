import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterScrollComponent } from './router-scroll.component';

describe('RouterScrollComponent', () => {
  let component: RouterScrollComponent;
  let fixture: ComponentFixture<RouterScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterScrollComponent ]
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

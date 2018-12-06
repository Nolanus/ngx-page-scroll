import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamespaceScrollComponent } from './namespace-scroll.component';

describe('NamespaceScrollComponent', () => {
  let component: NamespaceScrollComponent;
  let fixture: ComponentFixture<NamespaceScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NamespaceScrollComponent]
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

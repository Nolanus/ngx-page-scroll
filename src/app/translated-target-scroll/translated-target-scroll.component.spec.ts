import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatedTargetScrollComponent } from './translated-target-scroll.component';

describe('TranslatedTargetScrollComponent', () => {
  let component: TranslatedTargetScrollComponent;
  let fixture: ComponentFixture<TranslatedTargetScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatedTargetScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatedTargetScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

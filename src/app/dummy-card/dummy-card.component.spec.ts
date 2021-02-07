import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DummyCardComponent } from './dummy-card.component';
import { MatCardModule } from '@angular/material/card';
import { DummyContentComponent } from '../dummy-content/dummy-content.component';

describe('DummyCardComponent', () => {
  let component: DummyCardComponent;
  let fixture: ComponentFixture<DummyCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DummyCardComponent, DummyContentComponent],
      imports: [MatCardModule],
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

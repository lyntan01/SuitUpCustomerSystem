import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyMeasurementsComponent } from './view-my-measurements.component';

describe('ViewMyMeasurementsComponent', () => {
  let component: ViewMyMeasurementsComponent;
  let fixture: ComponentFixture<ViewMyMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyMeasurementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

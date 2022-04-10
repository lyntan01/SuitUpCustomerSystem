import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAppointmentComponent } from './create-new-appointment.component';

describe('CreateNewAppointmentComponent', () => {
  let component: CreateNewAppointmentComponent;
  let fixture: ComponentFixture<CreateNewAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

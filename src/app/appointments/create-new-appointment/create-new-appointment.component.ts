import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Customer } from 'src/app/models/customer';
import { AppointmentTypeEnum } from 'src/app/models/enum/appointment-type-enum';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-create-new-appointment',
  templateUrl: './create-new-appointment.component.html',
  styleUrls: ['./create-new-appointment.component.css'],
})
export class CreateNewAppointmentComponent implements OnInit {
  createAppointmentError: boolean;
  errorMessage: string | undefined;
  currentCustomer: Customer;
  display: boolean;
  newAppointment: Appointment;
  submitted: boolean;
  yearRange: string =
    new Date().getFullYear() + ':' + (new Date().getFullYear() + 10);
  minDate: Date = new Date();
  appointmentTypeEnum: String[];
  selectedAppointmentType: AppointmentTypeEnum | undefined;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private appointService: AppointmentService
  ) {
    this.createAppointmentError = false;
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.display = false;
    this.newAppointment = new Appointment();
    this.submitted = false;
    this.appointmentTypeEnum = Object.values(AppointmentTypeEnum);
    console.log(this.appointmentTypeEnum);
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  void() {
    console.log('test');
  }

  showDialog() {
    // this.minDate = this.roundToNearestHour(this.minDate);
    this.display = true;
  }

  // roundToNearestHour(date: Date): Date {
  //   date.setMinutes(date.getMinutes() + 30);
  //   date.setMinutes(0, 0, 0);
  //   console.log(date);

  //   return date;
  // }

  nextDay(date: Date): Date {
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.minDate.setHours(12, 0);
    return date;
  }
}

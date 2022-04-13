import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Customer } from 'src/app/models/customer';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-view-all-appointments',
  templateUrl: './view-all-appointments.component.html',
  styleUrls: ['./view-all-appointments.component.css'],
})
export class ViewAllAppointmentsComponent implements OnInit {
  appointments: Appointment[];
  customer: Customer;
  storeName: string;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private appointmentService: AppointmentService,
    private customerService: CustomerService
  ) {
    this.customer = this.sessionService.getCurrentCustomer();
    this.appointments = new Array();
    this.storeName = 'SuitUp';
  }

  ngOnInit(): void {
    this.checkLogin();

    this.appointmentService.getAppointmentsByCustomer().subscribe({
      next: (response) => {
        this.appointments = response;
        console.log(this.appointments);
      },
      error: (error) => {
        console.log('********** Retrieve all appointments' + error);
      },
    });
  }

  formattedDate(date: Date): String {
    console.log(date);
    return (
      date.toString().substring(5, 7) + ' / ' + date.toString().substring(2, 4)
    );
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }
}

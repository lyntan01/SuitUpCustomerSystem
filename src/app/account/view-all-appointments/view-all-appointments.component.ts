import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Customer } from 'src/app/models/customer';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-all-appointments',
  templateUrl: './view-all-appointments.component.html',
  styleUrls: ['./view-all-appointments.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ViewAllAppointmentsComponent implements OnInit {
  appointments: Appointment[];
  customer: Customer;
  storeName: string;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private appointmentService: AppointmentService,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

  formattedDate(date: Date): string {
    console.log(date.toLocaleString('en-US', { timeZone: 'ISO' }));
    // return date;
    return (
      date.toString().substring(5, 7) + ' / ' + date.toString().substring(2, 4)
    );
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  deleteAppointment(appointment: Appointment) {
    console.log(appointment);
    this.confirmationService.confirm({
      message:
        'Are you sure that you want to delete this Appointment : "' +
        appointment.appointmentTypeEnum +
        '" ?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.appointmentService
          .deleteAppointment(appointment.appointmentId)
          .subscribe({
            next: (response) => {
              this.ngOnInit();
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmed',
                detail: 'Appointment deleted!',
              });
            },
            error: (error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail:
                  'An error has occured while attempting to delete appointment: ' +
                  error,
              });
            },
          });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled.',
            });
            break;
        }
      },
    });
  }
}

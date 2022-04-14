import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { Customer } from 'src/app/models/customer';
import { AppointmentTypeEnum } from 'src/app/models/enum/appointment-type-enum';
import { Store } from 'src/app/models/store';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SessionService } from 'src/app/services/session.service';
import { StoreService } from 'src/app/services/store.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-new-appointment',
  templateUrl: './create-new-appointment.component.html',
  styleUrls: ['./create-new-appointment.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class CreateNewAppointmentComponent implements OnInit {
  errorMessage: string | undefined;
  currentCustomer: Customer;
  display: boolean;
  newAppointment: Appointment;
  submitted: boolean;
  yearRange: string =
    new Date().getFullYear() + ':' + (new Date().getFullYear() + 10);
  minDate: Date = new Date();
  appointmentTypeEnum: AppointmentTypeEnum[];
  selectedAppointmentType: AppointmentTypeEnum | undefined;
  stores: Store[];
  selectedStore: Store;
  password: string | undefined;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private appointService: AppointmentService,
    private storeService: StoreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.currentCustomer = new Customer();
    this.display = false;
    this.newAppointment = new Appointment();
    this.submitted = false;
    this.appointmentTypeEnum = Object.values(AppointmentTypeEnum);
    this.stores = new Array();
    this.selectedStore = new Store();
    this.password = this.sessionService.getPassword();
  }

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (response) => {
        this.stores = response;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error has occurred while retrieving all stores ' + error,
        });
      },
    });
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  showDialog() {
    this.checkLogin();
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.display = true;
  }

  createAppointment(createAppointmentForm: NgForm) {
    let enumComparator = AppointmentTypeEnum.ALTERATION;

    if (
      String(this.newAppointment.appointmentTypeEnum) === String(enumComparator)
    ) {
      this.newAppointment.isFree = false;
    } else {
      this.newAppointment.isFree = true;
    }

    this.submitted = true;
    let tempAppointment: Appointment = Object.assign({}, this.newAppointment);

    if (createAppointmentForm.valid) {
      this.appointService
        .createAppointment(
          this.currentCustomer,
          tempAppointment,
          this.selectedStore,
          this.sessionService.getPassword()
        )
        .subscribe(
          (response) => {
            let newAppointmentId: number = response;

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Appointment successfully created!',
            });

            this.newAppointment = new Appointment();

            createAppointmentForm.form.markAsUntouched();
            createAppointmentForm.form.markAsPristine();
            createAppointmentForm.form.updateValueAndValidity();

            this.display = false;
          },
          (error) => {
            this.submitted = false;

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error has occurred while creating appointment: ' + error,
            });
          }
        );
    }
  }
}

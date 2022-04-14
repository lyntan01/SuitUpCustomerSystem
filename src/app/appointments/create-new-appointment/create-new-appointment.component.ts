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
  appointmentTypeEnum: AppointmentTypeEnum[];
  selectedAppointmentType: AppointmentTypeEnum | undefined;
  stores: Store[];
  selectedStore: Store;
  password: string | undefined;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private appointService: AppointmentService,
    private storeService: StoreService
  ) {
    this.createAppointmentError = false;
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.display = false;
    this.newAppointment = new Appointment();
    this.submitted = false;
    this.appointmentTypeEnum = Object.values(AppointmentTypeEnum);
    this.stores = new Array();
    console.log(this.appointmentTypeEnum);
    this.selectedStore = new Store();
    this.password = this.sessionService.getPassword();
  }

  ngOnInit(): void {
    this.checkLogin();

    this.storeService.getStores().subscribe({
      next: (response) => {
        this.stores = response;
        console.log(this.stores);
      },
      error: (error) => {
        console.log('********** Retrieve all stores' + error);
      },
    });
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

  createAppointment(createAppointmentForm: NgForm) {
    // console.log(createCustomerForm);
    // console.log(this.newCustomer);
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

            this.createAppointmentError = false;
          },
          (error) => {
            this.createAppointmentError = true;
            this.submitted = false;
            this.errorMessage =
              'An error has occurred while creating apppointment: ' + error;

            console.log(error);
          }
        );
    }
  }
}

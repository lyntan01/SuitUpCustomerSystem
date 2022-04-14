import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JacketMeasurement } from 'src/app/models/jacket-measurement';
import { PantsMeasurement } from 'src/app/models/pants-measurement';
import { MeasurementService } from 'src/app/services/measurement.service';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-view-my-measurements',
  templateUrl: './view-my-measurements.component.html',
  styleUrls: ['./view-my-measurements.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ViewMyMeasurementsComponent implements OnInit {
  loadedJacketMeasurement: JacketMeasurement;
  loadedPantsMeasurement: PantsMeasurement;
  submitted: boolean;
  currentCustomer: Customer;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private measurementService: MeasurementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.loadedJacketMeasurement = new JacketMeasurement();
    this.loadedPantsMeasurement = new PantsMeasurement();
    this.submitted = false;
    this.currentCustomer = this.sessionService.getCurrentCustomer();
  }

  ngOnInit(): void {
    this.checkLogin();

    this.measurementService.getJacketMeasurementByCustomer().subscribe({
      next: (response) => {
        if (response === null) {
          this.loadedJacketMeasurement = new JacketMeasurement();
        } else {
          this.loadedJacketMeasurement = response;
        }
      },
      error: (error) => {
        console.log('********** Retrieve Jacket Measurement' + error);
      },
    });

    this.measurementService.getPantsMeasurementByCustomer().subscribe({
      next: (response) => {
        if (response === null) {
          this.loadedPantsMeasurement = new PantsMeasurement();
        } else {
          this.loadedPantsMeasurement = response;
        }
      },
      error: (error) => {
        console.log('********** Retrieve Pants Measurement' + error);
      },
    });
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  clear() {
    this.submitted = false;
    this.loadedJacketMeasurement = new JacketMeasurement();
    this.loadedPantsMeasurement = new PantsMeasurement();
  }

  updateJacketMeasurement(updateJacketMeasurementForm: NgForm) {
    this.submitted = true;

    if (updateJacketMeasurementForm.valid) {
      this.submitted = true;
      let tempJacketMeasurement = Object.assign(
        {},
        this.loadedJacketMeasurement
      );

      if (updateJacketMeasurementForm.valid) {
        if (
          this.sessionService.getCurrentCustomer().jacketMeasurement != null
        ) {
          this.measurementService
            .updateJacketMeasurement(tempJacketMeasurement)
            .subscribe(
              () => {
                this.ngOnInit();
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Jacket Measurement has been updated!',
                });
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'An error has occurred while updating jacket measurement ' +
                    error,
                });
              }
            );
        } else {
          this.measurementService
            .createJacketMeasurement(tempJacketMeasurement)
            .subscribe(
              (response) => {
                console.log(response);

                this.currentCustomer.jacketMeasurement = response;
                this.sessionService.setCurrentCustomer(this.currentCustomer);

                console.log(
                  this.sessionService.getCurrentCustomer().jacketMeasurement
                );

                this.ngOnInit();
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Jacket Measurement has been saved!',
                });
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'An error has occurred while saving jacket measurement ' +
                    error,
                });
              }
            );
        }
      }
    }
  }

  updatePantsMeasurement(updatePantsMeasurementForm: NgForm) {
    this.submitted = true;

    if (updatePantsMeasurementForm.valid) {
      this.submitted = true;
      let tempPantsMeasurement = Object.assign({}, this.loadedPantsMeasurement);

      if (updatePantsMeasurementForm.valid) {
        if (this.sessionService.getCurrentCustomer().pantsMeasurement != null) {
          this.measurementService
            .updatePantsMeasurement(tempPantsMeasurement)
            .subscribe(
              () => {
                this.ngOnInit();
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Pants Measurement has been updated!',
                });
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'An error has occurred while updating pants measurement ' +
                    error,
                });
              }
            );
        } else {
          this.measurementService
            .createPantsMeasurement(tempPantsMeasurement)
            .subscribe(
              (response) => {
                console.log(response);

                this.currentCustomer.pantsMeasurement = response;
                this.sessionService.setCurrentCustomer(this.currentCustomer);

                console.log(
                  this.sessionService.getCurrentCustomer().pantsMeasurement
                );

                this.ngOnInit();
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'Pants Measurement has been saved!',
                });
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'An error has occurred while saving pants measurement ' +
                    error,
                });
              }
            );
        }
      }
    }
  }
}

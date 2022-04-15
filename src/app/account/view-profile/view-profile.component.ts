import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ViewProfileComponent implements OnInit {
  currentCustomer: Customer;
  submitted: boolean;

  constructor(
    public sessionService: SessionService,
    private customerService: CustomerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.submitted = false;
  }

  ngOnInit(): void {}

  updateProfile(updateProfileForm: NgForm) {
    this.submitted = true;

    if (updateProfileForm.valid) {
      this.submitted = true;
      let tempCustomer: Customer = Object.assign({}, this.currentCustomer);
      tempCustomer.password = this.sessionService.getPassword();

      if (updateProfileForm.valid) {
        console.log(tempCustomer);
        this.customerService.updateProfile(tempCustomer).subscribe(
          () => {
            console.log(this.currentCustomer);
            let lastName = this.currentCustomer.lastName;
            let firstName = this.currentCustomer.firstName;
            this.currentCustomer.fullName = firstName + ' ' + lastName;
            this.sessionService.setCurrentCustomer(this.currentCustomer);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Profile successfully updated!',
            });
            window.location.reload();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error has occurred while attempting to update profile: ' +
                error,
            });
          }
        );
      }
    }
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  clear() {
    this.submitted = false;
    this.currentCustomer = this.sessionService.getCurrentCustomer();
  }
}

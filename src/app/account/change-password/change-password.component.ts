import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { SessionService } from 'src/app/services/session.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  currentCustomer: Customer;
  currentPassword: string | undefined;
  oldPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
  submitted: boolean;
  changePasswordError: boolean;
  errorMessage: string | undefined;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.currentPassword = this.sessionService.getPassword();
    this.changePasswordError = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  changePassword(changePasswordForm: NgForm) {
    this.submitted = true;

    // console.log(this.oldPassword);
    // console.log(this.currentPassword);
    // console.log(this.newPassword);
    // console.log(this.confirmPassword);

    if (changePasswordForm.invalid) {
      // console.log('fail');
    } else if (
      this.oldPassword === this.currentPassword &&
      this.newPassword === this.confirmPassword
    ) {
      // console.log('test');
      this.customerService
        .changePassword(this.oldPassword!, this.newPassword!)
        .subscribe(
          (response) => {
            this.sessionService.setPassword(this.confirmPassword);
            this.currentPassword = this.sessionService.getPassword();

            this.changePasswordError = false;
            this.submitted = false;

            this.oldPassword = undefined;
            this.newPassword = undefined;
            this.confirmPassword = undefined;

            changePasswordForm.form.markAsPristine();
            changePasswordForm.form.markAsUntouched();
            changePasswordForm.form.updateValueAndValidity();
          },
          (error) => {
            this.changePasswordError = true;
            this.errorMessage =
              'An error has occurred while changing the password: ' + error;
            console.log(error);
          }
        );
    } else {
    }
  }
}

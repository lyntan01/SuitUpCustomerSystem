import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { SessionService } from 'src/app/services/session.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ChangePasswordComponent implements OnInit {
  currentCustomer: Customer;
  currentPassword: string | undefined;
  oldPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;
  submitted: boolean;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.currentPassword = this.sessionService.getPassword();
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

    if (changePasswordForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'All fields have to be filled!',
      });
    } else if (
      this.oldPassword === this.currentPassword &&
      this.newPassword === this.confirmPassword
    ) {
      this.customerService
        .changePassword(this.oldPassword!, this.newPassword!)
        .subscribe(
          (response) => {
            this.sessionService.setPassword(this.confirmPassword);
            this.currentPassword = this.sessionService.getPassword();

            this.submitted = false;

            this.oldPassword = undefined;
            this.newPassword = undefined;
            this.confirmPassword = undefined;

            changePasswordForm.form.markAsPristine();
            changePasswordForm.form.markAsUntouched();
            changePasswordForm.form.updateValueAndValidity();

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Password successfully updated!',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'Error occurred while attempting to change password: ' + error,
            });
          }
        );
    } else {
    }
  }
}

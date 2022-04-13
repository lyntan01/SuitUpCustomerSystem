import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css'],
})
export class ViewProfileComponent implements OnInit {
  currentCustomer: Customer;
  updateProfileError: boolean;
  errorMessage: string | undefined;
  submitted: boolean;

  constructor(
    public sessionService: SessionService,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.updateProfileError = false;
    this.submitted = false;
  }

  ngOnInit(): void {}

  updateProfile(updateProfileForm: NgForm) {
    this.submitted = true;
    // let tempCustomer: Customer = Object.assign({}, this.currentCustomer);
    // tempCustomer.password = this.sessionService.getPassword();

    if (updateProfileForm.valid) {
      this.submitted = true;
      let tempCustomer: Customer = Object.assign({}, this.currentCustomer);
      tempCustomer.password = this.sessionService.getPassword();

      if (updateProfileForm.valid) {
        console.log(tempCustomer);
        this.customerService.updateProfile(tempCustomer).subscribe(
          () => {
            this.sessionService.setCurrentCustomer(this.currentCustomer);
            this.updateProfileError = false;
          },
          (error) => {
            this.updateProfileError = true;
            this.errorMessage =
              'An error has occurred while updating the profile: ' + error;
            console.log(error);
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

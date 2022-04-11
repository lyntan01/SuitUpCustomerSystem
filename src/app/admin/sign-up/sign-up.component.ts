import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  newCustomer: Customer;
  signupError: boolean;
  registered: boolean;
  errorMessage: string | undefined;
  submitted: boolean;

  constructor(
    private router: Router,
    public sessionService: SessionService,
    private customerService: CustomerService
  ) {
    this.newCustomer = new Customer();
    this.signupError = false;
    this.submitted = false;
    this.registered = false;
  }

  ngOnInit(): void {}

  clear() {
    this.submitted = false;
    this.newCustomer = new Customer();
  }

  customerRegister(createCustomerForm: NgForm) {
    // console.log(createCustomerForm);
    // console.log(this.newCustomer);
    this.submitted = true;
    let tempCustomer: Customer = Object.assign({}, this.newCustomer);

    if (createCustomerForm.valid) {
      this.customerService.createCustomer(tempCustomer).subscribe(
        (response) => {
          let newCustomerId: number = response;

          this.signupError = false;
          this.registered = true;
        },
        (error) => {
          this.signupError = true;
          this.registered = false;
          this.errorMessage =
            'An error has occurred while signing in: ' + error;

          console.log(error);
        }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';
import { NgForm } from '@angular/forms';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class SignUpComponent implements OnInit {
  newCustomer: Customer;
  registered: boolean;
  errorMessage: string | undefined;
  submitted: boolean;

  constructor(
    private router: Router,
    public sessionService: SessionService,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.newCustomer = new Customer();
    this.submitted = false;
    this.registered = false;
  }

  ngOnInit(): void {}

  clear() {
    this.submitted = false;
    this.newCustomer = new Customer();
  }

  customerRegister(createCustomerForm: NgForm) {
    this.submitted = true;
    let tempCustomer: Customer = Object.assign({}, this.newCustomer);

    if (createCustomerForm.valid) {
      this.customerService.createCustomer(tempCustomer).subscribe(
        (response) => {
          let newCustomerId: number = response;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account successfully created!',
          });

          this.registered = true;
        },
        (error) => {
          this.registered = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error has occurred while signing up: ' + error,
          });
        }
      );
    }
  }
}

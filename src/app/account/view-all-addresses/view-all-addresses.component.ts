import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Message, MessageService } from 'primeng/api';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
@Component({
  selector: 'app-view-all-addresses',
  templateUrl: './view-all-addresses.component.html',
  styleUrls: ['./view-all-addresses.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ViewAllAddressesComponent implements OnInit {
  addresses: Address[];
  currentCustomer: Customer;
  displayBasic: boolean;
  newAddress: Address;
  submitted: boolean;

  constructor(
    public sessionService: SessionService,
    private router: Router,
    private addressService: AddressService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.addresses = new Array();
    this.currentCustomer = this.sessionService.getCurrentCustomer();
    this.displayBasic = false;
    this.newAddress = new Address();
    this.submitted = false;
  }

  ngOnInit(): void {
    this.checkLogin();

    this.addressService.getAddresses().subscribe({
      next: (response: Address[]) => {
        this.addresses = response;
        this.currentCustomer.addresses = this.addresses;
        this.sessionService.getCurrentCustomer().addresses = this.addresses;
      },
      error: (error: String) => {
        console.log('********** Retrieve all addresses' + error);
      },
    });
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  clear() {
    this.submitted = false;
    this.newAddress = new Address();
  }

  createNewAddress(createAddressForm: NgForm) {
    this.displayBasic = false;
    this.submitted = true;

    let tempAddress: Address = Object.assign({}, this.newAddress);

    if (createAddressForm.valid) {
      this.addressService.createNewAddress(tempAddress).subscribe(
        (response) => {
          let newAddressId: number = response;

          this.newAddress = new Address();
          this.ngOnInit();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail:
              'Address successfully created! ' + '(ID: ' + newAddressId + ')',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'An error has occurred while creating credit card: ' + error,
          });
        }
      );
    }
  }

  deleteAddress(address: Address) {
    console.log(address);
    this.confirmationService.confirm({
      message:
        'Are you sure that you want to delete this Address : ' +
        address.addressLineOne +
        ', ' +
        address.addressLineTwo +
        '?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.addressService.deleteAddress(address.addressId).subscribe({
          next: (response) => {
            this.ngOnInit();
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Address deleted!',
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error,
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

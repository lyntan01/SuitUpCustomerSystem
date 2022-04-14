import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';
import { Address } from '../../models/address';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css'],
  providers: [MessageService],
})
export class DeliveryAddressComponent implements OnInit {
  deliveryAddress: Address;
  existingAddresses: Address[];
  submitted: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private sessionService: SessionService
  ) {
    this.deliveryAddress = new Address();
    this.existingAddresses = new Array();
    this.submitted = false;
  }

  ngOnInit(): void {
    // let tmpAddress = this.sessionService.getDeliveryAddress();
    // if (
    //   this.sessionService.getCurrentCustomer() != null &&
    //   this.sessionService.getCurrentCustomer().addressEntities != null &&
    //   this.sessionService.getCurrentCustomer().addressEntities?.length
    // ) {
    //   this.sessionService
    //     .getCurrentCustomer()
    //     .addressEntities?.forEach((address: Address | undefined) => {
    //       if (address != null) {
    //         this.deliveryAddress = address;
    //         this.sessionService.setDeliveryAddress(address);
    //         return;
    //       }
    //     });
    // } else if (tmpAddress) {
    //   this.deliveryAddress = tmpAddress;
    //   console.log(tmpAddress);
    // }
  }

  nextPage(deliveryAddressForm: NgForm): void {
    this.submitted = true;
    if (deliveryAddressForm.valid) {
      this.sessionService.setDeliveryAddress(this.deliveryAddress);
      this.router.navigate(['checkout/paymentMethod']);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Address or Postal Code is not filled in',
      });
    }
  }
}

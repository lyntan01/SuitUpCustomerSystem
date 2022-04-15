import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';
import { AddressService } from 'src/app/services/address.service';
import { Address } from '../../models/address';
import { CollectionMethodEnum } from 'src/app/models/enum/collection-method-enum';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css'],
  providers: [MessageService],
})
export class DeliveryAddressComponent implements OnInit {
  newDeliveryAddress: Address;
  selectedDeliveryAddress: Address | undefined;
  existingAddresses: Address[];
  submitted: boolean;
  selectedCollectionMethod: SelectItem;
  collectionMethods: SelectItem[];
  expressOrder: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private sessionService: SessionService,
    private addressService: AddressService
  ) {
    this.newDeliveryAddress = new Address();
    // this.selectedDeliveryAddress = undefined;
    this.existingAddresses = new Array();
    this.submitted = false;
    let tmp: Object[] = Object.values(CollectionMethodEnum);
    this.collectionMethods = [
      { label: 'Delivery', value: tmp[0].toString().toUpperCase() },
      { label: 'Pickup', value: tmp[1].toString().toUpperCase() },
    ];
    this.selectedCollectionMethod = this.collectionMethods[0];
    this.expressOrder = false;
  }

  ngOnInit(): void {
    this.checkLogin();

    this.addressService.getAddresses().subscribe(
      (response) => {
        this.existingAddresses = response;
      },
      (error) => {
        console.log('DeliveryAddressComponent: ' + error);
      }
    );
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

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  // addNewAddress(): void {}

  nextPage(deliveryAddressForm: NgForm): void {
    this.submitted = true;
    this.sessionService.setCollectionMethod(this.selectedCollectionMethod.value);
    this.sessionService.setExpressOrder(this.expressOrder);

    if (this.selectedDeliveryAddress) {
      // will take selected address by default, if both selected and new address created
      this.sessionService.setDeliveryAddress(this.selectedDeliveryAddress);
      console.log(this.sessionService.getDeliveryAddress()?.name);
      this.router.navigate(['checkout/paymentMethod']);
    } else if (deliveryAddressForm.valid) {
      this.sessionService.setDeliveryAddress(this.newDeliveryAddress);
      console.log('addressId = ' + this.sessionService.getDeliveryAddress()?.addressId);
      console.log(this.sessionService.getDeliveryAddress()?.name);
      this.router.navigate(['checkout/paymentMethod']);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please select an address or add a new address',
      });
    }
  }
}

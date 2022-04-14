import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';
import { Address } from 'src/app/models/address';
import { CreditCard } from 'src/app/models/credit-card';
import { Customer } from 'src/app/models/customer';
import { OrderLineItem } from 'src/app/models/order-line-item';
import { Promotion } from 'src/app/models/promotion';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
  providers: [MessageService],
})
export class OrderSummaryComponent implements OnInit {

  cart: OrderLineItem[];
    promotion: Promotion | undefined;
    total: number;
    collectionMethod: String;
    deliveryAddress: Address;
    creditCard: CreditCard;
    submitted: boolean;
    currCustomer: Customer;

    constructor(
        private router: Router,
        private sessionService: SessionService,
        private messageService: MessageService,
        // private productService: ProductService,
        // private orderService: OrderService,
        // private addressService: AddressService,
        // private customerService: CustomerService
    ) {
        this.cart = [];
        this.total = 0;
        this.collectionMethod = '';
        this.deliveryAddress = new Address();
        this.creditCard = new CreditCard();
        this.submitted = false;
        this.promotion = undefined;
        this.currCustomer = this.sessionService.getCurrentCustomer();
    }

  ngOnInit(): void {
  }

}

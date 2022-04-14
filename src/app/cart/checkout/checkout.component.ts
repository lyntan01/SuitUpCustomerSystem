import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';

import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService],
})
export class CheckoutComponent implements OnInit {
  items: MenuItem[];

  constructor(
    public sessionService: SessionService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.items = [];
  }

  ngOnInit(): void {
    this.checkLogin();
    this.items = [
        {
            label: 'Delivery Address',
            routerLink: 'deliveryAddress',
        },
        {
            label: 'Payment Method',
            routerLink: 'paymentMethod',
        },
        {
            label: 'Review',
            routerLink: 'orderSummary',
        },
    ];
}

checkLogin() {
    if (!this.sessionService.getIsLogin()) {
        this.router.navigate(['/accessRightError']);
    }
}

order(orderForm: NgForm): void {
    if (orderForm.valid) {
    }
}
}

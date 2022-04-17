import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderStatusEnum } from 'src/app/models/enum/order-status-enum';
import { OrderService } from 'src/app/services/order.service';
import { SessionService } from 'src/app/services/session.service';
import { OrderLineItem } from 'src/app/models/order-line-item';

@Component({
  selector: 'app-view-order-item-details',
  templateUrl: './view-order-item-details.component.html',
  styleUrls: ['./view-order-item-details.component.css'],
})
export class ViewOrderItemDetailsComponent implements OnInit {
  orderId: string | null;
  order: Order;
  orderLineItems: OrderLineItem[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private orderService: OrderService
  ) {
    this.order = new Order();
    this.orderId = null;
    this.orderLineItems = [];
  }

  ngOnInit(): void {
    this.checkLogin();
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    this.fetchOrder();
  }

  fetchOrder() {
    if (this.orderId != null) {
      this.orderService
        .getOrderById(parseInt(this.orderId))
        .subscribe((response) => {
          this.order = response;
          if (this.order.orderLineItems) {
            this.orderLineItems = this.order.orderLineItems;
          }
          console.log(this.order);
        });
    }
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.css'],
  providers: [MessageService],
})
export class CheckoutConfirmationComponent implements OnInit {
  checkoutOrder: Order | undefined;

  constructor(
    public sessionService: SessionService,
    public messageService: MessageService,
    public orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    let checkoutOrderId = this.sessionService.getCheckoutOrderId();
    if (checkoutOrderId) {
      this.orderService.getOrderById(checkoutOrderId).subscribe(
        (response) => {
          this.checkoutOrder = response;
          console.log(this.checkoutOrder.serialNumber);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'An error has occurred while retrieving the order: ' + error,
          });
        }
      );
    }
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }
}

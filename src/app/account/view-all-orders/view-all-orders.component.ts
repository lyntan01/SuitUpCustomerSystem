import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Order } from 'src/app/models/order';
import { SessionService } from 'src/app/services/session.service';
import { OrderService } from 'src/app/services/order.service';
import { FormsModule } from '@angular/forms';
// import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.css'],
})
export class ViewAllOrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    private primengConfig: PrimeNGConfig,
    private orderService: OrderService,
    public sessionService: SessionService,
    // private messageService: MessageService,
    private router: Router
  ) {
    this.orders = new Array();
    this.primengConfig.ripple = true;
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        this.orders = response;
        // this.orders.reverse();
        console.log(this.orders);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formattedDate(date: Date): string {
    console.log(date.toLocaleString('en-US', { timeZone: 'ISO' }));
    // return date;
    return (
      date.toString().substring(5, 7) + ' / ' + date.toString().substring(2, 4)
    );
  }

  checkLogin() {
    if (!this.sessionService.getIsLogin()) {
      this.router.navigate(['/accessRightError']);
    }
  }

  viewOrderDetails(order: Order) {
    console.log(order);
    this.router.navigate(['/viewOrderDetails/' + order.orderId]);
  }
}

//   onRowSelect(event: any) {
//     let value = event.value;

//     console.log(value);
//   }
// }
//HIII

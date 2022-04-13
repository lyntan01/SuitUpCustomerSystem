import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

import { SessionService } from '../../services/session.service';
import { OrderLineItem } from 'src/app/models/order-line-item';
import { Promotion } from 'src/app/models/promotion';
import { PromotionService } from '../../services/promotion.service';
import { StandardProductService } from 'src/app/services/standard-product.service'; // TESTING
import { StandardProduct } from 'src/app/models/standard-product'; // TESTING
import { Product } from 'src/app/models/product';
import { CustomizedProduct } from 'src/app/models/customized-product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CartComponent implements OnInit {
  cart: OrderLineItem[];
  promotionCode: string;
  promotion: Promotion | undefined;
  totalNumItems: number;
  total: number;
  orderLineItem: OrderLineItem; // TESTING
  product: StandardProduct; // TESTING

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private promotionService: PromotionService,
    private standardProductService: StandardProductService // TESTING
  ) {
    this.cart = new Array();
    this.promotionCode = '';
    this.promotion = undefined;
    this.totalNumItems = 0.0;
    this.total = 0.0;
    this.orderLineItem = new OrderLineItem(); // TESTING
    this.product = new StandardProduct(); // TESTING
  }

  ngOnInit(): void {
    console.log('********** CartComponent.ts: ngOnInit()');
    this.standardProductService.getStandardProductById(1).subscribe({
      next: (response) => {
        console.log('response.image: ' + response.image);
        this.product = response;
        console.log('product.image: ' + this.product.image);
      },
      error: (error) => {
        console.log('********** CartComponent.ts: ' + error);
      },
    });
    console.log('product.image: ' + this.product.image);
  }

  initialiseTestCart() {
    console.log('********** CartComponent.ts: initialiseTestCart()');
    // Hardcode order line items in card for testing

    // let orderLineItem: OrderLineItem;
    // let product: StandardProduct = new StandardProduct(); // = new StandardProduct(0, '', '', '', '', 0, 0, 0);

    this.orderLineItem = new OrderLineItem(
      1,
      1,
      this.product.unitPrice,
      this.product
    );
    console.log(
      'orderLineItem.product?.image: ' + this.orderLineItem.product?.image
    );
    this.cart.push(this.orderLineItem);

    this.sessionService.setCart(this.cart);
    this.totalNumItems = this.cart.length;

    this.total = this.getTotal();
  }

  getTotal(): number {
    console.log('********** CartComponent.ts: getTotal()');
    let total: number = 0;
    for (let i = 0; i < this.cart.length; i++) {
      let orderItem: OrderLineItem = this.cart[i];
      total += this.getUnitPrice(orderItem.product);
      // total += orderItem.product?.unitCost || 0;
      // if (orderItem.product instanceof StandardProduct) {
      //   let product: StandardProduct = <StandardProduct>orderItem.product;
      //   total += product.unitPrice || 0;
      // } else if (orderItem.product instanceof CustomizedProduct) {
      //   let product: CustomizedProduct = <CustomizedProduct>orderItem.product;
      //   total += product.totalPrice || 0;
      // }
    }
    return total;
  }

  // Helper method
  // returns -1 if product or unit price is null
  getUnitPrice(product: Product | undefined) : number {
    if (product instanceof StandardProduct) {
      let standardProduct: StandardProduct = <StandardProduct>product;
      return standardProduct.unitPrice || -1;
    } else if (product instanceof CustomizedProduct) {
      let customizedProduct: CustomizedProduct = <CustomizedProduct>product;
      return customizedProduct.totalPrice || -1;
    }
    return -1;
  }

  getDiscountedTotal(total: number): number {
    console.log('********** CartComponent.ts: getDiscountedTotal()');
    if (this.promotion && this.promotion.promotionCode) {
      // return total - total * this.coupon.discountRate;
      this.promotionService
        .getDiscountedAmount(this.promotion.promotionCode, this.total)
        .subscribe({
          next: (response) => {
            return response;
          },
          error: (error) => {
            console.log(
              '********** CartComponent.ts: getDiscountedTotal() :' + error
            );
            this.messageService.add({
              severity: 'warn',
              summary: 'Invalid',
              detail: error.split('error has occurred: ')[1],
            });
          },
        });
    }
    return 0;
  }

  applyPromotionCode(applyPromotionCodeForm: NgForm): void {
    if (applyPromotionCodeForm.valid) {
      if (this.promotionCode.length == 0) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Invalid',
          detail: 'Please enter a promotion code',
        });
      } else {
        this.promotionService
          .getPromotionByPromotionCode(this.promotionCode)
          .subscribe(
            (response) => {
              this.promotion = response;
            },
            (error) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Invalid',
                detail: 'Promotion Code is invalid',
              });
              console.log(
                '********** CartComponent.ts: applyPromotionCode() : ' + error
              );
            }
          );
        this.total = this.getDiscountedTotal(this.total);
      }
    }
  }

  cartChangeQuantity(event: any, orderItem: OrderLineItem): void {
    if (orderItem) {
        let quantity = orderItem.quantity;
        let prevSubtotal = orderItem.subTotal;
    //     let unitPrice = orderItem.product?.unitPrice;
    //     if (this.cart && prevSubtotal && quantity == 0) {
    //         this.removeFromCart(prevSubtotal, orderItem.orderItemNumber);
    //     } else {
    //         if (prevSubtotal && quantity && unitPrice) {
    //             let newSubtotal = quantity * unitPrice;
    //             let cartItemIndex = this.cart.findIndex((oi) => {
    //                 return oi.orderItemNumber === orderItem.orderItemNumber;
    //             });
    //             this.cart[cartItemIndex].subTotal = newSubtotal;
    //             this.cart[cartItemIndex].quantity = quantity;
    //             let subTotalToAdd = newSubtotal;
    //             if (orderItem.productEntity?.saleEntity) {
    //                 subTotalToAdd = this.getDiscountedSubtotal(orderItem);
    //             }
    //             this.total -= prevSubtotal;
    //             this.total += subTotalToAdd;
    //         }
    //     }
        this.sessionService.setCart(this.cart);
    }
  }

  deleteOrderItem(orderItem: OrderLineItem) {
    // if (orderItem && orderItem.orderItemNumber) {
    //     this.confirmationService.confirm({
    //         message:
    //             'Are you sure you want to delete ' +
    //             orderItem.productEntity?.name +
    //             '?',
    //         header: 'Confirm',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             if (orderItem.subTotal && orderItem.orderItemNumber) {
    //                 if (orderItem.productEntity?.saleEntity) {
    //                     this.removeFromCart(
    //                         this.getDiscountedSubtotal(orderItem),
    //                         orderItem.orderItemNumber
    //                     );
    //                 } else {
    //                     this.removeFromCart(
    //                         orderItem.subTotal,
    //                         orderItem.orderItemNumber
    //                     );
    //                 }
    //             }
    //         },
    //     });
    // }
  }

  private removeFromCart(subtotal: number, orderItemNumber: number): void {
    // let i = 1;
    // this.total -= subtotal;
    // let cartItemIndex = this.cart.findIndex((oi) => {
    //     console.log(oi);
    //     return oi.orderItemNumber === orderItemNumber;
    // });
    // this.messageService.add({
    //     severity: 'info',
    //     summary: 'Product removed',
    //     detail:
    //         this.cart[cartItemIndex].productEntity?.name +
    //         ' has been removed',
    // });
    // this.cart.splice(cartItemIndex, 1);
    // this.sessionService.setCart(this.cart);
    // if (
    //     this.coupon &&
    //     this.coupon.minimumSpend &&
    //     this.coupon.minimumSpend > this.total
    // ) {
    //     this.coupon = undefined;
    // }
  }

  checkoutCart(): void {
    if (this.sessionService.getIsLogin()) {
      this.sessionService.setCart(this.cart);
      this.router.navigate(['/checkout']);
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Hi!',
        detail: 'Please login before checking out',
      });
    }
  }
}

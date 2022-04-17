import { CustomizedPants } from 'src/app/models/customized-pants';
import { CustomizedJacket } from './../../models/customized-jacket';
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
  discountedTotal: number;

  constructor(
    private router: Router,
    public sessionService: SessionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private promotionService: PromotionService,
  ) {
    this.cart = new Array();
    this.promotionCode = '';
    this.promotion = undefined;
    this.totalNumItems = 0.0;
    this.total = 0.0;
    this.discountedTotal = 0.0;
  }

  ngOnInit(): void {
    let tmpCart = this.sessionService.getCart();
    let tmpPromotion = this.sessionService.getPromotion();

    if (tmpCart) {
      this.cart = tmpCart;
      this.totalNumItems = tmpCart.length;
      this.total = this.getTotal();
    }

    if (tmpPromotion && tmpPromotion.promotionCode) {
      this.promotion = tmpPromotion;
      this.promotionCode = tmpPromotion.promotionCode;
      this.discountedTotal = this.getDiscountedTotal();
    }
  }

  

  getTotal(): number {
    console.log('********** CartComponent.ts: getTotal()');
    let total: number = 0;
    for (let i = 0; i < this.cart.length; i++) {
      console.log('i = ' + i);

      let orderItem: OrderLineItem = this.cart[i];
      console.log(orderItem.product?.name);

      total += this.getUnitPrice(orderItem.product) * (orderItem.quantity || 1);
      console.log('i = ' + i + ', total = ' + total);
    }
    return total;
  }

  // Helper method
  // returns -1 if product or unit price is null
  getUnitPrice(product: Product | undefined): number {
    if ((<StandardProduct>product).unitPrice) {
      console.log('STANDARD PRODUCT');
      return (<StandardProduct>product).unitPrice || -1;
    } else if ((<CustomizedProduct>product).totalPrice) {
      return (<CustomizedProduct>product).totalPrice || -1;
    }
    return -1;
  }

  getDiscountedTotal() {
    if (this.promotion && this.promotion.promotionCode) {
      this.promotionService
        .getDiscountedAmount(this.promotion.promotionCode, this.total)
        .subscribe({
          next: (response) => {
            console.log('response: ' + response);
            this.discountedTotal = response;
          },
          error: (error) => {
            console.log(
              '********** CartComponent.ts: getDiscountedTotal() :' + error
            );
            this.promotion = undefined;
            let errorArray = String(error).split('HTTP 400: ');
            console.log(errorArray);
            this.messageService.add({
              severity: 'warn',
              summary: 'Invalid',
              detail: errorArray[1],
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
              this.getDiscountedTotal();
              this.sessionService.setPromotion(this.promotion);
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
      }
    }
  }

  cartChangeQuantity(event: any, orderItem: OrderLineItem): void {
    if (orderItem) {
      let quantity = orderItem.quantity;
      let prevSubtotal = orderItem.subTotal;
      let unitPrice = this.getUnitPrice(orderItem.product);
      if (
        this.cart &&
        prevSubtotal &&
        quantity == 0 &&
        orderItem.product?.name
      ) {
        this.removeFromCart(prevSubtotal, orderItem.product?.name as string);
      } else {
        if (prevSubtotal && quantity && unitPrice) {
          let newSubtotal = quantity * unitPrice;
          let cartItemIndex = this.cart.findIndex((oi) => {
            return oi.product?.name === orderItem.product?.name;
          });
          this.cart[cartItemIndex].subTotal = newSubtotal;
          this.cart[cartItemIndex].quantity = quantity;
          this.total -= prevSubtotal;
          this.total += newSubtotal;
          this.discountedTotal = this.getDiscountedTotal();
        }
      }
      this.sessionService.setCart(this.cart);
    }
  }

  deleteOrderItem(orderItem: OrderLineItem) {
    if (orderItem && orderItem.product) {
      this.confirmationService.confirm({
        message:
          'Are you sure you want to delete ' + orderItem.product?.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (orderItem.subTotal && orderItem.product?.name) {
            this.removeFromCart(
              orderItem.subTotal,
              orderItem.product?.name
            );
          }
        },
      });
    }
  }

  private removeFromCart(subtotal: number, name: string): void {
    let cartItemIndex = this.cart.findIndex((oi) => {
      console.log(oi);
      return oi.product?.name === name;
    });
    this.messageService.add({
      severity: 'info',
      summary: 'Product removed',
      detail: this.cart[cartItemIndex].product?.name + ' has been removed',
    });
    this.cart.splice(cartItemIndex, 1);
    this.sessionService.setCart(this.cart);

    this.total -= subtotal;
    this.discountedTotal = this.getDiscountedTotal();

    if (
      this.promotion &&
      this.promotion.minimumSpending &&
      this.promotion.minimumSpending > this.total
    ) {
      this.promotion = undefined;
    }
  }

  checkoutCart(): void {
    console.log(this.cart);
    if (this.sessionService.getIsLogin()) {
      
      let hasCustomizedJacket = false;
      let hasCustomizedPants = false;

      for (let item of this.cart) {
        console.log(item);
        if ((<CustomizedJacket>item.product).innerFabric) {
          hasCustomizedJacket = true;
        } else if ((<CustomizedPants>item.product).pantsCutting) {
          hasCustomizedPants = true;
        }
      }

      console.log(hasCustomizedJacket);
      console.log(hasCustomizedPants);

      if (hasCustomizedJacket && this.sessionService.getCurrentCustomer().jacketMeasurement === undefined) {
        this.messageService.add({
          severity: 'info',
          summary: 'Hi!',
          detail: 'It seems like you have a Customized Jacket in your cart, please make sure you have a jacket measurements recorded in your profile before checking out',
        });
        return;
      }

      if (hasCustomizedPants && this.sessionService.getCurrentCustomer().pantsMeasurement === undefined) {
        this.messageService.add({
          severity: 'info',
          summary: 'Hi!',
          detail: 'It seems like you have a Customized Pants in your cart, please make sure you have a pants measurements recorded in your profile before checking out',
        });
        return;
      }
      
      this.setMeasurements();
      
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

  setMeasurements() {
    for (let item of this.cart) {
      if ((<CustomizedJacket>item.product).innerFabric) {
        (<CustomizedJacket>item.product).jacketMeasurement = this.sessionService.getCurrentCustomer().jacketMeasurement;
        (<CustomizedJacket>item.product).totalPrice = Number((<CustomizedJacket>item.product).totalPrice?.toFixed(2));
        (<CustomizedJacket>item.product).basePrice = Number((<CustomizedJacket>item.product).basePrice?.toFixed(2));
      } else if ((<CustomizedPants>item.product).pantsCutting) {
        (<CustomizedPants>item.product).pantsMeasurement = this.sessionService.getCurrentCustomer().pantsMeasurement;
        (<CustomizedPants>item.product).totalPrice = Number((<CustomizedPants>item.product).totalPrice?.toFixed(2));
        (<CustomizedPants>item.product).basePrice = Number((<CustomizedPants>item.product).basePrice?.toFixed(2));
      }
    }
  }
}

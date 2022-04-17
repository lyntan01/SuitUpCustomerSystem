import { CustomizedPants } from 'src/app/models/customized-pants';
import { CustomizedJacket } from './../../models/customized-jacket';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/services/session.service';
import { Address } from 'src/app/models/address';
import { CreditCard } from 'src/app/models/credit-card';
import { Customer } from 'src/app/models/customer';
import { OrderLineItem } from 'src/app/models/order-line-item';
import { Promotion } from 'src/app/models/promotion';
import { OrderService } from 'src/app/services/order.service';
import { AddressService } from 'src/app/services/address.service';
import { CollectionMethodEnum } from 'src/app/models/enum/collection-method-enum';
import { StandardProduct } from 'src/app/models/standard-product';
import { CustomizedProduct } from 'src/app/models/customized-product';
import { Product } from 'src/app/models/product';
import { PromotionService } from 'src/app/services/promotion.service';
import { Order } from 'src/app/models/order';
import { OrderStatusEnum } from 'src/app/models/enum/order-status-enum';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Transaction } from 'src/app/models/transaction';
import { CustomizedProductService } from 'src/app/services/customized-product.service';
import { delay } from 'rxjs';

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
  discountedTotal: number;
  collectionMethod: CollectionMethodEnum;
  expressOrder: boolean;
  deliveryAddress: Address;
  creditCard: CreditCard;
  submitted: boolean;
  currCustomer: Customer;
  storeAddress: Address;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private messageService: MessageService,
    private orderService: OrderService,
    private addressService: AddressService,
    private creditCardService: CreditCardService,
    private promotionService: PromotionService,
    private customizedProductService: CustomizedProductService
  ) {
    this.cart = [];
    this.total = 0;
    this.discountedTotal = 0;
    this.collectionMethod = CollectionMethodEnum.DELIVERY;
    this.expressOrder = false;
    this.deliveryAddress = new Address();
    this.creditCard = new CreditCard();
    this.submitted = false;
    this.promotion = undefined;
    this.currCustomer = this.sessionService.getCurrentCustomer();
    this.storeAddress = new Address();
  }

  ngOnInit(): void {
    this.checkLogin();

    let tmpCart = this.sessionService.getCart();
    let tmpPromotion = this.sessionService.getPromotion();
    let tmpDeliveryAddress = this.sessionService.getDeliveryAddress();
    let tmpCollectionMethod = this.sessionService.getCollectionMethod();
    let tmpExpressOrder = this.sessionService.getExpressOrder();
    let tmpCreditCard = this.sessionService.getCreditCard();

    if (tmpCart) {
      this.cart = tmpCart;
      this.total = this.getTotal();
    }

    if (tmpPromotion) {
      this.promotion = tmpPromotion;
      this.getDiscountedTotal();
    }

    if (tmpDeliveryAddress) {
      this.deliveryAddress = tmpDeliveryAddress;
    }

    if (tmpCollectionMethod) {
      console.log('ngOnInit() : tmpCollectionMethod = ' + tmpCollectionMethod);
      this.collectionMethod =
        tmpCollectionMethod === 'DELIVERY'
          ? CollectionMethodEnum.DELIVERY
          : CollectionMethodEnum.PICKUP;
    }

    if (tmpCreditCard && tmpCreditCard.cardNumber != undefined) {
      this.creditCard = tmpCreditCard;
    }

    if (tmpExpressOrder !== undefined) {
      console.log('ngOnInit() : tmpExpressOrder = ' + tmpExpressOrder);
      this.expressOrder = tmpExpressOrder;
    }

    this.addressService.getAddressById(1).subscribe(
      (response) => {
        this.storeAddress = response;
      },
      (error) => {
        console.log('Store Address not found!');
      }
    );
  }

  getTotal(): number {
    let total: number = 0;
    for (let i = 0; i < this.cart.length; i++) {
      let orderItem: OrderLineItem = this.cart[i];
      total += this.getUnitPrice(orderItem.product) * (orderItem.quantity || 1);
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

  formattedDate(date: Date | undefined): String {
    return date
      ? date.toString().substring(5, 7) +
          ' / ' +
          date.toString().substring(2, 4)
      : '';
  }

  prevPage(): void {
    this.router.navigate(['checkout/paymentMethod']);
  }

  persist() {
    for (let item of this.cart) {
      if ((<CustomizedJacket>item.product).innerFabric) {
        let newJacket = <CustomizedJacket>item.product;
        this.customizedProductService
          .createCustomizedJacket(
            newJacket,
            newJacket.pocketStyle?.customizationId as number,
            newJacket.jacketStyle?.customizationId as number,
            newJacket.innerFabric?.customizationId as number,
            newJacket.outerFabric?.customizationId as number,
            this.sessionService.getCurrentCustomer().jacketMeasurement
              ?.jacketMeasurementId as number
          )
          .subscribe((productId) => {
            if (item.product) {
              item.product.productId = productId;
            }
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error has occurred while creating the new customized jacket: ' +
                error,
            });
          });
      } else if ((<CustomizedPants>item.product).pantsCutting) {
        let newPants = <CustomizedPants>item.product;
        console.log(newPants);
        this.customizedProductService
          .createCustomizedPants(
            newPants,
            newPants.fabric?.customizationId as number,
            this.sessionService.getCurrentCustomer().pantsMeasurement
            ?.pantsMeasurementId as number,
            newPants.pantsCutting?.customizationId as number,
          )
          .subscribe((productId) => {
            if (item.product) {
              item.product.productId = productId;
            }
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error has occurred while creating the new customized pants: ' +
                error,
            });
          });
      }
    }
  }

  async checkout(): Promise<void> {
    this.submitted = true;

    let totalOrderItem = 0;
    let totalQuantity = 0;
    let order = new Order();

    this.persist()
    await new Promise(resolve => setTimeout(resolve, 1000));

    for (let items of this.cart) {
      console.log(items.product?.productId);
    }
  
    this.cart.forEach((orderItem) => {
      if (
        orderItem &&
        orderItem.quantity &&
        orderItem.subTotal &&
        orderItem.product?.name
      ) {
        totalOrderItem++;
        totalQuantity += orderItem.quantity;
        order.addOrderItem(orderItem);
      }
    });

    order.totalLineItem = totalOrderItem;
    order.totalQuantity = totalQuantity;

    if (this.promotion && this.promotion.promotionCode) {
      order.totalAmount = this.discountedTotal;
    } else {
      order.totalAmount = this.total;
    }

    order.orderDateTime = new Date();
    order.expressOrder = this.expressOrder;
    order.orderStatusEnum = OrderStatusEnum.UNPAID;
    order.collectionMethodEnum = this.collectionMethod;

    order.customer = this.currCustomer;
    order.promotion = this.promotion;

    // Verify delivery address
    if (
      this.deliveryAddress &&
      this.collectionMethod == CollectionMethodEnum.DELIVERY
    ) {
      // New address created
      if (!this.deliveryAddress.addressId) {
        this.addressService.createNewAddress(this.deliveryAddress).subscribe(
          (response) => {
            this.deliveryAddress.addressId = response;
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error has occurred while creating the new address: ' +
                error,
            });
            console.log(error);
          }
        );
      }

      this.addressService
        .getAddressById(this.deliveryAddress.addressId || 0)
        .subscribe(
          (response) => {
            order.deliveryAddress = response;
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error has occurred while retrieving the delivery address: ' +
                error,
            });
            console.log(error);
          }
        );
    }

    // Verify credit card
    if (this.creditCard && this.creditCard.creditCardId) {
      this.creditCardService
        .getCreditCardById(this.creditCard.creditCardId)
        .subscribe(
          (response) => {
            order.orderStatusEnum = OrderStatusEnum.PAID;
            this.orderService.createOrder(order).subscribe(
              (orderId) => {
                order.orderId = orderId;

                if (this.promotion) {
                  this.orderService.applyPromotionCode(order).subscribe(
                    (orderId) => {
                      this.sessionService.setCheckoutOrderId(orderId);
                      this.sessionService.clearCheckout();
                      console.log(orderId);
                      this.router.navigate([
                        '/checkoutConfirmation',
                        { orderId: orderId },
                      ]);
                    },
                    (error) => {
                      this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail:
                          'An error has occurred while applying the promotion: ' +
                          error,
                      });
                    }
                  );
                } else {
                  this.sessionService.setCheckoutOrderId(orderId);
                  this.sessionService.clearCheckout();
                  console.log(orderId);
                  this.router.navigate([
                    '/checkoutConfirmation',
                    { orderId: orderId },
                  ]);
                }
              },
              (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'An error has occurred while creating the new order: ' +
                    error,
                });
              }
            );
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail:
                'An error has occurred while creating the new order: ' + error,
            });
            console.log(error);
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

import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { CreditCard } from '../models/credit-card';
import { Customer } from '../models/customer';
import { CollectionMethodEnum } from '../models/enum/collection-method-enum';
import { OrderLineItem } from '../models/order-line-item';
import { Promotion } from '../models/promotion';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  getIsLogin(): boolean {
    if (sessionStorage.getItem('isLogin') == 'true') {
      return true;
    } else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage.setItem('isLogin', JSON.stringify(isLogin));
  }

  getCurrentCustomer(): Customer {
    return JSON.parse(sessionStorage['currentCustomer']);
  }

  setCurrentCustomer(currentCustomer: Customer | null): void {
    sessionStorage.setItem('currentCustomer', JSON.stringify(currentCustomer));
  }

  getEmail(): string | undefined {
    const email = sessionStorage.getItem('email');

    if (typeof email === 'string') {
      return email;
    } else {
      return undefined;
    }
  }

  setEmail(email: string): void {
    sessionStorage.setItem('email', email);
  }

  getPassword(): string {
    return sessionStorage['password'];
  }

  setPassword(password: string | undefined): void {
    sessionStorage['password'] = password;
  }

  getCustomizedNumber(): number {
    return sessionStorage['customizedNumber'] == undefined ? 1 : sessionStorage['customizedNumber'] as number;
  }

  setCustomizedNumber(index: number): void {
    sessionStorage.setItem('customizedNumber', index.toString());
  }

  getCart(): OrderLineItem[] | undefined {
    const cart = sessionStorage.getItem('cart');

    if (typeof cart === 'string') {
      return JSON.parse(cart);
    } else {
      return [];
    }
  }

  setCart(orderItems: OrderLineItem[]): void {
    sessionStorage.setItem('cart', JSON.stringify(orderItems));
  }

  getCreditCard(): CreditCard | undefined {
    const creditCard = sessionStorage.getItem('creditCard');

    if (typeof creditCard === 'string') {
      return JSON.parse(creditCard);
    } else {
      return undefined;
    }
  }

  setCreditCard(creditCard: CreditCard): void {
    // console.log('SessionService: setCreditCard: expiry date = ' + creditCard.expiryDate);
    sessionStorage.setItem('creditCard', JSON.stringify(creditCard));
  }

  getDeliveryAddress(): Address | undefined {
    const deliveryAddress = sessionStorage.getItem('deliveryAddress');

    if (typeof deliveryAddress === 'string') {
      return JSON.parse(deliveryAddress);
    } else {
      return undefined;
    }
  }

  setDeliveryAddress(deliveryAddress: Address): void {
    sessionStorage.setItem('deliveryAddress', JSON.stringify(deliveryAddress));
  }

  getCollectionMethod(): string | undefined {
    return sessionStorage.getItem('collectionMethod')?.toUpperCase();
  }

  // Put the string value of the enum, not enum itself
  setCollectionMethod(collectionMethod: string) {
    sessionStorage.setItem('collectionMethod', collectionMethod);
  }

  getExpressOrder(): boolean | undefined {
    return sessionStorage.getItem('expressOrder')?.toLowerCase() == 'true';
  }

  setExpressOrder(expressOrder: boolean) {
    sessionStorage.setItem('expressOrder', String(expressOrder));
  }

  getPromotion(): Promotion | undefined {
    const promotion = sessionStorage.getItem('promotion');
    if (typeof promotion === 'string') {
      return JSON.parse(promotion);
    } else {
      return undefined;
    }
  }

  setPromotion(promotion: Promotion | undefined) {
    sessionStorage.setItem('promotion', JSON.stringify(promotion));
  }

  setCheckoutOrderId(checkoutOrderId: number | undefined) {
    console.log("SessionService: setCheckoutOrderId : orderId = " + checkoutOrderId);
    sessionStorage.setItem('checkoutOrderId', JSON.stringify(checkoutOrderId));
  }

  getCheckoutOrderId(): number | undefined {
    const checkoutOrderId = sessionStorage.getItem('checkoutOrderId');
    console.log("SessionService: getCheckoutOrderId : orderId = " + checkoutOrderId);
    if (typeof checkoutOrderId === 'string') {
      return JSON.parse(checkoutOrderId);
    } else {
      return undefined;
    }
  }

  clearCheckout() {
    sessionStorage.setItem('cart', JSON.stringify(new Array()));
    sessionStorage.removeItem('creditCard');
    sessionStorage.removeItem('deliveryAddress');
    sessionStorage.removeItem('promotion');
  }

  checkAccessRight(path: string): boolean {
    if (!this.getIsLogin()) {
      if (
        path == '/profile' ||
        path == '/viewAllCreditCards' ||
        path == '/changePassword' ||
        path == '/createNewCreditCard' ||
        path == '/changePassword' ||
        path == '/checkout' ||
        path == '/checkoutConfirmation' ||
        path == '/viewAllOrders' ||
        path.startsWith('/viewOrderItemDetails') ||
        path == '/viewAllAppointments' ||
        path == '/viewAppointmentDetails'
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (
        path == 'accessRightError' ||
        path == 'login' ||
        path == 'signup' ||
        path == 'forgetPassword'
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
}

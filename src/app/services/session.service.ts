import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { CreditCard } from '../models/credit-card';
import { Customer } from '../models/customer';
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

  getCurrentCustomer(): Customer | undefined {
    const currentCustomer = sessionStorage.getItem('currentCustomer');

    if (typeof currentCustomer === 'string') {
      return JSON.parse(currentCustomer); //as Customer
    } else {
      return undefined;
    }
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

  getPassword(): string | undefined {
    const password = sessionStorage.getItem('password');

    if (typeof password === 'string') {
      return password;
    } else {
      return undefined;
    }
  }

  setPassword(password: string): void {
    sessionStorage.setItem('password', password);
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
    sessionStorage.setItem('checkoutOrderId', JSON.stringify(checkoutOrderId));
  }

  getCheckoutOrderId(): number | undefined {
    const checkoutOrderId = sessionStorage.getItem('checkoutOrderId');
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

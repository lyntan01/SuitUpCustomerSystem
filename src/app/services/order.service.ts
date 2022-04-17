import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Order } from '../models/order';
import { CreateOrderReq } from '../models/create-order-req';
import { ApplyPromotionCodeReq } from '../models/apply-promotion-code-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = '/api/Order';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getAllOrders(): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(
        this.baseUrl +
          '/retrieveOrdersByCustomer' +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.httpClient
      .get<Order>(
        this.baseUrl +
          '/retrieveOrder/' +
          orderId +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  // Order is created first before promotion is applied

  createOrder(newOrder: Order): Observable<number> {
    let createOrderReq: CreateOrderReq = new CreateOrderReq(
      this.sessionService.getEmail(),
      this.sessionService.getPassword(),
      newOrder,
      this.sessionService.getDeliveryAddress()
        ? this.sessionService.getDeliveryAddress()?.addressId
        : undefined
    );

    return this.httpClient
      .put<number>(this.baseUrl, createOrderReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  applyPromotionCode(newOrder: Order): Observable<number> {
    let promotion = this.sessionService.getPromotion();
    let applyPromotionCodeReq: ApplyPromotionCodeReq =
      new ApplyPromotionCodeReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        newOrder,
        promotion ? promotion.promotionCode : newOrder.promotion?.promotionCode
      );

    return this.httpClient.post<number>(
      this.baseUrl,
      applyPromotionCodeReq,
      httpOptions
    );
  }

  createTransaction(newOrder: Order): Observable<number> {

    let applyPromotionCodeReq: ApplyPromotionCodeReq =
      new ApplyPromotionCodeReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        newOrder,
        ''
      );

    return this.httpClient.post<number>(
      this.baseUrl,
      applyPromotionCodeReq,
      httpOptions
    );
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.httpClient
      .delete<any>(
        this.baseUrl +
          '/' +
          orderId +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}

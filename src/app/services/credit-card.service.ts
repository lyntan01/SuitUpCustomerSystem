import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreditCard } from '../models/credit-card';
import { SessionService } from './session.service';
import { UpdateCreditCardReq } from '../models/update-credit-card-req';
import { CreateCreditCardReq } from '../models/create-credit-card-req';
import { Customer } from '../models/customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  baseUrl: string = '/api/CreditCard';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getCreditCards(customer: Customer): Observable<CreditCard[]> {
    return this.httpClient
      .get<CreditCard[]>(
        this.baseUrl +
          '/retrieveCreditCards' +
          '?email=' +
          customer.email +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getCreditCardById(creditCardId: number): Observable<CreditCard> {
    return this.httpClient
      .get<CreditCard>(
        this.baseUrl +
          '/' +
          creditCardId +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  createNewCreditCard(
    newCreditCard: CreditCard
    // expiryDate?: number
  ): Observable<number> {
    let createCreditCardReq: CreateCreditCardReq = new CreateCreditCardReq(
      this.sessionService.getCurrentCustomer().email,
      this.sessionService.getPassword(),
      newCreditCard
      // expiryDate
    );

    return this.httpClient
      .put<number>(this.baseUrl, createCreditCardReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteCreditCard(creditCardId?: number): Observable<any> {
    return this.httpClient
      .delete<any>(
        this.baseUrl +
          '/' +
          creditCardId +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  updateCreditCard(creditCard?: CreditCard): Observable<any> {
    let updateCreditCardReq: UpdateCreditCardReq = new UpdateCreditCardReq(
      this.sessionService.getCurrentCustomer()?.email,
      this.sessionService.getCurrentCustomer()?.password,
      creditCard,
      creditCard?.expiryDate
    );

    return this.httpClient.post<any>(
      this.baseUrl,
      updateCreditCardReq,
      httpOptions
    );
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

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Customer } from '../models/customer';
import { CreateCustomerReq } from '../models/create-customer-req';
import { CustomerChangePasswordReq } from '../models/customer-change-password-req';
import { UpdateAddressReq } from '../models/update-address-req';
import { UpdateProfileReq } from '../models/update-profile-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl: string = '/api/Customer';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  customerLogin(
    email: string | undefined,
    password: string | undefined
  ): Observable<Customer> {
    return this.httpClient
      .get<Customer>(
        this.baseUrl + '/customerLogin?email=' + email + '&password=' + password
      )
      .pipe(catchError(this.handleError));
  }

  createCustomer(newCustomer: Customer): Observable<number> {
    let createCustomerReq: CreateCustomerReq = new CreateCustomerReq(
      newCustomer
    );
    return this.httpClient
      .put<number>(
        this.baseUrl + '/customerRegister',
        createCustomerReq,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getCustomerById(customerId: number): Observable<Customer> {
    return this.httpClient
      .get<Customer>(
        this.baseUrl + '/retrieveCustomerByCustomerId/' + customerId
      )
      .pipe(catchError(this.handleError));
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    let customerChangePasswordReq: CustomerChangePasswordReq =
      new CustomerChangePasswordReq(
        this.sessionService.getEmail(),
        oldPassword,
        newPassword
      );

    return this.httpClient
      .post<any>(
        this.baseUrl + '/changePassword',
        customerChangePasswordReq,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // include update profile method — need to add update profile req model first
  updateProfile(password: string, firstName: string, lastName: string) {
    let updateProfileReq: UpdateProfileReq = new UpdateProfileReq(
      this.sessionService.getEmail(),
      password,
      firstName,
      lastName
    );

    return this.httpClient
      .post<any>(this.baseUrl + '/updateProfile', updateProfileReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' +
        `HTTP ${error.status}: ${error.statusText}`;
    }

    console.error(`HTTP ${error.status}: ${error.error}`);

    return throwError(errorMessage);
  }
}

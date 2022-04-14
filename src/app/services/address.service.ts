import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Address } from '../models/address';
import { UpdateAddressReq } from '../models/update-address-req';
import { CreateAddressReq } from '../models/create-address-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  baseUrl: string = '/api/Address';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getCurrentCustomerAddresses(): Observable<Address[]> {
    return this.httpClient
      .get<Address[]>(
        this.baseUrl +
          '/retrieveAllAddressesByCustomer?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getAddressById(addressId: number): Observable<Address> {
    return this.httpClient
      .get<Address>(
        this.baseUrl +
          '/retrieveAddress/' +
          addressId +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  createAddress(address?: Address): Observable<any> {
    let createAddressReq: CreateAddressReq = new CreateAddressReq(
      this.sessionService.getCurrentCustomer()?.email,
      this.sessionService.getCurrentCustomer()?.password, 
      address
    );

    return this.httpClient.put<any>(
      this.baseUrl,
      createAddressReq,
      httpOptions
    );
  }

  updateAddress(address?: Address): Observable<any> {
    let updateAddressReq: UpdateAddressReq = new UpdateAddressReq(
      this.sessionService.getCurrentCustomer()?.email,
      this.sessionService.getCurrentCustomer()?.password, 
      address
    );

    return this.httpClient.post<any>(
      this.baseUrl,
      updateAddressReq,
      httpOptions
    );
  }

  deleteAddress(addressId?: number): Observable<any> {
    return this.httpClient
      .delete<any>(
        this.baseUrl +
          '/' +
          addressId +
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

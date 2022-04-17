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
import { CreateCustomizedPantsReq } from '../models/create-customized-pants-req';
import { CreateCustomizedJacketReq } from '../models/create-customized-jacket-req';
import { CustomizedJacket } from '../models/customized-jacket';
import { CustomizedPants } from '../models/customized-pants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CustomizedProductService {
  baseUrl: string = '/api/CustomizedProduct';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getCustomizedJacketByOrder(orderId: number): Observable<CustomizedJacket[]> {
    return this.httpClient
      .get<CustomizedJacket[]>(
        this.baseUrl +
          '/retrieveCustomizedJacketByOrder/' +
          orderId +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getCustomizedPantsByOrder(orderId: number): Observable<CustomizedPants[]> {
    return this.httpClient
      .get<CustomizedPants[]>(
        this.baseUrl +
          '/retrieveCustomizedPantsByOrder/' +
          orderId +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  createCustomizedJacket(
    newCustomizedJacket: CustomizedJacket,
    pocketStyleId: number,
    jacketStyleId: number,
    innerFabricId: number,
    outerFabricId: number,
    jacketMeasurementId: number
  ): Observable<number> {
    let createCustomizedJacketReq: CreateCustomizedJacketReq =
      new CreateCustomizedJacketReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        newCustomizedJacket,
        pocketStyleId,
        jacketStyleId,
        innerFabricId,
        outerFabricId,
        jacketMeasurementId
      );

      console.log(JSON.stringify(createCustomizedJacketReq));
    return this.httpClient
      .put<number>(
        this.baseUrl + '/createCustomizedJacket',
        createCustomizedJacketReq,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  createCustomizedPants(
    newCustomizedPants: CustomizedPants,
    fabricId: number,
    pantsMeasurementId: number,
    pantsCuttingId: number
  ): Observable<number> {
    console.log(newCustomizedPants);
    let createCustomizedPantsReq: CreateCustomizedPantsReq =
      new CreateCustomizedPantsReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        newCustomizedPants,
        fabricId,
        pantsCuttingId,
        pantsMeasurementId
      );

      console.log(JSON.stringify(createCustomizedPantsReq));
    return this.httpClient
      .put<number>(
        this.baseUrl + '/createCustomizedPants',
        createCustomizedPantsReq,
        httpOptions
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

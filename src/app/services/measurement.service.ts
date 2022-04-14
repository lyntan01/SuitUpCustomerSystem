import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';

import { JacketMeasurement } from '../models/jacket-measurement';
import { PantsMeasurement } from '../models/pants-measurement';
import { UpdatePantsMeasurementReq } from '../models/update-pants-measurement-req';
import { UpdateJacketMeasurementReq } from '../models/update-jacket-measurement-req';
import { CreatePantsMeasurementReq } from '../models/create-pants-measurement-req';
import { CreateJacketMeasurementReq } from '../models/create-jacket-measurement-req';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  baseUrl: string = '/api/Measurement';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getJacketMeasurementByCustomer(): Observable<JacketMeasurement> {
    return this.httpClient
      .get<JacketMeasurement>(
        this.baseUrl +
          '/retrieveJacketMeasurementByCustomer' +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  getPantsMeasurementByCustomer(): Observable<PantsMeasurement> {
    return this.httpClient
      .get<PantsMeasurement>(
        this.baseUrl +
          '/retrievePantsMeasurementByCustomer' +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  createJacketMeasurement(
    newJacketMeasurement: JacketMeasurement
  ): Observable<JacketMeasurement> {
    let createJacketMeasurement: CreateJacketMeasurementReq =
      new CreateJacketMeasurementReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        newJacketMeasurement
      );
    return this.httpClient
      .put<JacketMeasurement>(
        this.baseUrl + '/createJacketMeasurement',
        createJacketMeasurement,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  createPantsMeasurement(
    newPantsMeasurement: PantsMeasurement
  ): Observable<PantsMeasurement> {
    let createPantsMeasurement: CreatePantsMeasurementReq =
      new CreatePantsMeasurementReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        newPantsMeasurement
      );
    return this.httpClient
      .put<PantsMeasurement>(
        this.baseUrl + '/createPantsMeasurement',
        createPantsMeasurement,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateJacketMeasurement(
    updatedJacketMeasurementIn: JacketMeasurement
  ): Observable<any> {
    let updateJacketMeasurementReq: UpdateJacketMeasurementReq =
      new UpdateJacketMeasurementReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        updatedJacketMeasurementIn
      );
    return this.httpClient
      .post<any>(
        this.baseUrl +
          '/updateJacketMeasurement' +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword(),
        updateJacketMeasurementReq,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updatePantsMeasurement(
    updatedPantsMeasurementIn: PantsMeasurement
  ): Observable<any> {
    let updatePantsMeasurementReq: UpdatePantsMeasurementReq =
      new UpdatePantsMeasurementReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        updatedPantsMeasurementIn
      );
    return this.httpClient
      .post<any>(
        this.baseUrl +
          '/updatePantsMeasurement' +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword(),
        updatePantsMeasurementReq,
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

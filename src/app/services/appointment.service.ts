import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { CreateAppointmentReq } from '../models/create-appointment-req';
import { Appointment } from '../models/appointment';
import { Store } from '../models/store';
import { Customer } from '../models/customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  baseUrl: string = '/api/Appointment';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  createAppointment(
    customer: Customer,
    appointment: Appointment,
    store: Store,
    password: string
  ): Observable<number> {
    let createAppointmentReq: CreateAppointmentReq = new CreateAppointmentReq(
      customer,
      appointment,
      store,
      password
    );
    return this.httpClient
      .put<number>(this.baseUrl, createAppointmentReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAppointmentsByCustomer(): Observable<Appointment[]> {
    return this.httpClient
      .get<Appointment[]>(
        this.baseUrl +
          '/retrieveAllAppointmentsByCustomer' +
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

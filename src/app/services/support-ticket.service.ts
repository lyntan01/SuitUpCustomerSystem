import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { CreateSupportTicketReq } from '../models/create-support-ticket-req';
import { SupportTicket } from '../models/support-ticket';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SupportTicketService {
  baseUrl: string = '/api/SupportTicket';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  createSupportTicket(supportTicket: SupportTicket): Observable<number> {
    let createSupportTicketReq: CreateSupportTicketReq =
      new CreateSupportTicketReq(
        this.sessionService.getEmail(),
        this.sessionService.getPassword(),
        supportTicket
      );
    return this.httpClient
      .put<number>(this.baseUrl, createSupportTicketReq, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getSupportTicketsByCustomer(): Observable<SupportTicket[]> {
    return this.httpClient
      .get<SupportTicket[]>(
        this.baseUrl +
          '/retrieveAllSupportTicketsByCustomer' +
          '?email=' +
          this.sessionService.getEmail() +
          '&password=' +
          this.sessionService.getPassword()
      )
      .pipe(catchError(this.handleError));
  }

  deleteSupportTicket(supportTicketId?: number): Observable<any> {
    return this.httpClient
      .delete<any>(
        this.baseUrl +
          '/' +
          supportTicketId +
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

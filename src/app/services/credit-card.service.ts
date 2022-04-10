import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreditCard } from '../models/credit-card';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  baseUrl: string = '/api/CreditCard';

  constructor(private httpClient: HttpClient) {}

  getCreditCards(): Observable<CreditCard[]> {
    return this.httpClient
      .get<CreditCard[]>(this.baseUrl + '/retrieveAllCreditCards')
      .pipe(catchError(this.handleError));
  }

  createNewCreditCard(newCreditCard: CreditCard): Observable<CreditCard> {
    return this.httpClient
      .put<CreditCard>(this.baseUrl, newCreditCard, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteCreditCard(creditCardId?: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + '/');
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

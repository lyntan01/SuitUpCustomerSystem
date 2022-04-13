import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Promotion } from '../models/promotion';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  baseUrl: string = '/api/Promotion';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getPromotionByPromotionCode(promotionCode: string): Observable<Promotion> {
    return this.httpClient
      .get<Promotion>(
        this.baseUrl +
          '/retrievePromotionByPromotionCode?promotionCode=' +
          promotionCode
      )
      .pipe(catchError(this.handleError));
  }

  getDiscountedAmount(
    promotionCode: string,
    totalAmount: number
  ): Observable<number> {
    return this.httpClient
      .get<number>(
        this.baseUrl +
          '/applyPromotion?promotionCode=' +
          promotionCode +
          '&totalAmount=' +
          totalAmount
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

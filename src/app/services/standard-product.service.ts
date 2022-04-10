import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StandardProduct } from '../models/standard-product';
import { Category } from '../models/category';
import { SessionService } from './session.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class StandardProductService {
  baseUrl: string = '/api/StandardProduct';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getStandardProducts(): Observable<StandardProduct[]> {
    return this.httpClient
      .get<StandardProduct[]>(this.baseUrl + '/retrieveAllStandardProducts')
      .pipe(catchError(this.handleError));
  }

  getStandardProductById(
    standardProductId: number
  ): Observable<StandardProduct> {
    return this.httpClient
      .get<StandardProduct>(this.baseUrl + '/' + standardProductId)
      .pipe(catchError(this.handleError));
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(this.baseUrl + '/retrieveAllCategories')
      .pipe(catchError(this.handleError));
  }

  getStandardProductsByCategory(
    categoryId: number
  ): Observable<StandardProduct> {
    return this.httpClient
      .get<StandardProduct>(this.baseUrl + '/' + categoryId)
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

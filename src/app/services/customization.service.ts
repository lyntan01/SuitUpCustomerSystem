import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { PocketStyle } from '../models/pocket-style';
import { Fabric } from '../models/fabric';
import { PantsCutting } from '../models/pants-cutting';
import { JacketStyle } from '../models/jacket-style';
import { Colour } from '../models/colour';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class Customization {
  baseUrl: string = '/api/Customization';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getPantsCuttings(): Observable<PantsCutting[]> {
    return this.httpClient
      .get<PantsCutting[]>(this.baseUrl + '/retrieveAllPantsCutting')
      .pipe(catchError(this.handleError));
  }

  getPantsCuttingById(pantsCuttingId: number): Observable<PantsCutting> {
    return this.httpClient
      .get<PantsCutting>(
        this.baseUrl + '/retrievePantsCutting' + '/' + pantsCuttingId
      )
      .pipe(catchError(this.handleError));
  }

  getJacketStyles(): Observable<JacketStyle[]> {
    return this.httpClient
      .get<JacketStyle[]>(this.baseUrl + '/retrieveAllJacketStyle')
      .pipe(catchError(this.handleError));
  }

  getJacketStyleById(jacketStyleId: number): Observable<JacketStyle> {
    return this.httpClient
      .get<JacketStyle>(
        this.baseUrl + '/retrieveJacketStyle' + '/' + jacketStyleId
      )
      .pipe(catchError(this.handleError));
  }

  getPocketStyles(): Observable<PocketStyle[]> {
    return this.httpClient
      .get<PocketStyle[]>(this.baseUrl + '/retrieveAllPocketStyle')
      .pipe(catchError(this.handleError));
  }

  getPocketStyleById(pocketStyleId: number): Observable<PocketStyle> {
    return this.httpClient
      .get<PocketStyle>(
        this.baseUrl + '/retrievePocketStyle' + '/' + pocketStyleId
      )
      .pipe(catchError(this.handleError));
  }

  getColours(): Observable<Colour[]> {
    return this.httpClient
      .get<Colour[]>(this.baseUrl + '/retrieveAllColours')
      .pipe(catchError(this.handleError));
  }

  getColourById(colourId: number): Observable<Colour> {
    return this.httpClient
      .get<Colour>(this.baseUrl + '/retrieveColour' + '/' + colourId)
      .pipe(catchError(this.handleError));
  }

  getFabrics(): Observable<Fabric[]> {
    return this.httpClient
      .get<Fabric[]>(this.baseUrl + '/retrieveAllFabrics')
      .pipe(catchError(this.handleError));
  }

  getFabricById(fabricId: number): Observable<Fabric> {
    return this.httpClient
      .get<Fabric>(this.baseUrl + '/retrieveFabric' + '/' + fabricId)
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

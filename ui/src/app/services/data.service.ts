import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly API_BASE_URL = environment.apiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  getAmadeusLocation(iataCode: string): Observable<any> {
    return this.httpClient
      .get(`${this.API_BASE_URL}/reference-data?iataCode=${iataCode}`)
      .pipe(catchError(error => throwError(error)));
  }

  getFlightOffers(request: any): Observable<any> {
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      children,
      infants,
    } = request;
    return this.httpClient
      .get(
        `${this.API_BASE_URL}/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&children=${children}&infants=${infants}`
      )
      .pipe(catchError(error => throwError(error)));
  }

  getFlightFinalPrice(flightOffers: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_BASE_URL}/flight-offers-final-price`, { flightOffers })
      .pipe(catchError(error => throwError(error)));
  }

  createFlightOrder(flightOrder: any): Observable<any> {
    return this.httpClient
      .post(`${this.API_BASE_URL}/flight-order`, flightOrder)
      .pipe(catchError(error => throwError(error)));
  }
}

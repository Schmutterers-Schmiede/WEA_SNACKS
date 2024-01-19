import { Injectable } from '@angular/core';
import { Restaurant } from '../Entities/Restaurant';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RestaurantDataService {

  constructor(private httpClient:HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  } 
  
  getAllRestaurants():Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${environment.server}/restaurants`)
      .pipe(catchError(this.errorHandler))
  }

  getRestaurantById(id:string): Observable<Restaurant>{
    return this.httpClient.get<Restaurant>(`${environment.server}/restaurants/${id}`)
    .pipe(catchError(this.errorHandler));
  }
}

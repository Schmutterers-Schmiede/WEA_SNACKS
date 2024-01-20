import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../Entities/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  constructor(
    private httpClient:HttpClient
  ) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAllForRestaurantId(id:string){
    return this.httpClient.get<MenuItem[]>(`${environment.server}/menuItems/forrestaurant/${id}`)
    .pipe(catchError(this.errorHandler))
  }

  getById(id:string){
    return this.httpClient.get<MenuItem>(`${environment.server}/menuItems/${id}`)
    .pipe(catchError(this.errorHandler));
  }
}

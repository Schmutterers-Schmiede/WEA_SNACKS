import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
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

  CreateMenuItem(m:MenuItem, restaurantId:string):Observable<boolean>{
    return this.httpClient.post(`${environment.server}/menuItems/${restaurantId}`, m, {observe: 'response'})
    .pipe(
      map((res: HttpResponse<any>) => res.status === 200),
      catchError(this.errorHandler)
    );
  }

  updateMenuItem(menuItem:MenuItem):Observable<boolean>{
    return this.httpClient.put(`${environment.server}/menuItems/${menuItem.id}`, menuItem, {observe: 'response'})
    .pipe(
      map((res: HttpResponse<any>) => res.status === 204),
      catchError(this.errorHandler)
    );
  }

  deleteMenuItem(id:string):Observable<boolean>{
    return this.httpClient.delete(`${environment.server}/menuItems/${id}`, {observe: 'response'})
    .pipe(
      map((res: HttpResponse<any>) => res.status === 204),
      catchError(this.errorHandler)
    );
  }

  getAllForRestaurantId(id:string){
    return this.httpClient.get<MenuItem[]>(`${environment.server}/menuItems/forrestaurant/${id}`)
    .pipe(catchError(this.errorHandler))
  }

  getById(id:string){
    return this.httpClient.get<MenuItem>(`${environment.server}/menuItems/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  getCategoryNames():Observable<string[]>{
    return this.httpClient.get<string[]>(`${environment.server}/menuItems/categories`)
    .pipe(catchError(this.errorHandler));
  }
}

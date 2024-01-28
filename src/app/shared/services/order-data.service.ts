import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Entities/Order';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getOrdersForUserAccessToken(userAccessToken:string){
    return this.httpClient.get<Order[]>(`${environment.server}/orders/forUser/${userAccessToken}`)
    .pipe(catchError(this.errorHandler))
  }

  getOrderById(id:string){
    return this.httpClient.get<Order>(`${environment.server}/orders/byId/${id}`)
    .pipe(catchError(this.errorHandler))
  }

  placeOrder(order:Order):Observable<any>{
    console.log(order);
    
    return this.httpClient.post<any>(`${environment.server}/orders/${order.restaurantId}`, order)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }



}

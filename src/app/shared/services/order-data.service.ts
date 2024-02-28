import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Entities/Order';
import { Observable, catchError, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getOrdersForUser(username:string){
    return this.httpClient.get<Order[]>(`${environment.server}/orders/forUser/${username}`)
    .pipe(catchError(this.errorHandler))
  }

  getOrderById(id:string){
    return this.httpClient.get<Order>(`${environment.server}/orders/byId/${id}`)
    .pipe(catchError(this.errorHandler))
  }

  placeOrder(order:Order):Observable<any>{        
    return this.httpClient.post<any>(`${environment.server}/orders/${order.restaurantId}`, order)
      .pipe(catchError(this.errorHandler));
  }

  getOrdersForRestaurant(restaurantId:string):Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${environment.server}/orders/${restaurantId}`)
      .pipe(catchError(this.errorHandler));      
  }

  updateOrderStatus(orderId:string, statusIndex:number, username:string):Observable<boolean>{
    const payload = {
      "status": statusIndex,
      "apiKey": username
    }
    return this.httpClient.put(`${environment.server}/orders/${orderId}`, payload, { observe: 'response' })
    .pipe(
      map((res: HttpResponse<any>) => res.status === 204),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }



}

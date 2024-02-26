import { Injectable } from '@angular/core';
import { Restaurant } from '../Entities/Restaurant';
import { Observable, catchError, from, of } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { getDistance, convertDistance } from 'geolib';
import { map } from 'rxjs';
import { DeliveryCondition } from '../Entities/DeliveryCondition';
import { Order } from '../Entities/Order';


@Injectable({
  providedIn: 'root'
})
export class RestaurantDataService {

  constructor(private httpClient: HttpClient) {
    this.getUserLocation();
  }

  latitude!: number;
  longitude!: number;

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
      });
    } else {
      console.log('geolocation not supported');
    }
  }

  getOrdersForUser(username:string):Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${environment.server}/orders/forUser/${username}`)
      .pipe(catchError(this.errorHandler));
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${environment.server}/restaurants`)
      .pipe(
        map((restaurants: Restaurant[]) => {

          restaurants.forEach((restaurant: Restaurant) => {
            if (restaurant.latitude !== null && restaurant.longitude !== null) {
              restaurant.distance = convertDistance(
                getDistance(
                  { latitude: this.latitude, longitude: this.longitude },
                  { latitude: restaurant.latitude!, longitude: restaurant.longitude! }
                ), 'km');
            }
          });

          restaurants.sort((a: Restaurant, b: Restaurant) => {
            if (a.distance === null && b.distance === null) return 0;
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance! - b.distance!;
          });

          return restaurants;
        }),
        catchError(this.errorHandler)
      )
  }

  restaurantExistsForUser(userName: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.server}/restaurants/ExistsForUser/${userName}`)
      .pipe(catchError(this.errorHandler));
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${environment.server}/restaurants/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getRestaurantForUsername(username: string): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${environment.server}/restaurants/forUser/${username}`)
      .pipe(catchError(this.errorHandler));
  }

  updateRestaurant(restaurant: Restaurant): Observable<boolean> {
    return this.httpClient.put(`${environment.server}/restaurants/${restaurant.id}`, restaurant, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => res.status === 204),
        catchError(this.errorHandler)
      );
  }

  deleteRestaurant(id: string): Observable<boolean> {
    return this.httpClient.delete(`${environment.server}/restaurants/${id}`, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => res.status === 204),
        catchError(this.errorHandler)
      );
  }

  deleteDeliveryCondition(id: string): Observable<boolean> {
    return this.httpClient.delete(`${environment.server}/deliveryConditions/${id}`, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => res.status === 204),
        catchError(this.errorHandler)
      );
  }

  //the following two methods suffer from bad decisions in the backend design
  updateDeliveryCondition(dcData: { delConDto: DeliveryCondition, apiKey: string }): Observable<boolean> {
    return this.httpClient.put(`${environment.server}/deliveryConditions/${dcData.delConDto.id}`, dcData, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => res.status === 204),
        catchError(this.errorHandler)
      );
  }

  createDeliveryCondition(delConDto: DeliveryCondition, restaurantId: string, apiKey: string): Observable<boolean> {

    return this.httpClient.post(`${environment.server}/deliveryConditions/${restaurantId}`,
      {
        "delConDto": {
          "restaurantId": restaurantId,
          "distance": delConDto.distance,
          "deliveryCost": delConDto.deliveryCost,
          "minOrderTotal": delConDto.minOrderTotal,
          "freeDeliveryMinTotal": delConDto.FreeDeliveryMinTotal
        },
        "apiKey": apiKey
      }
      , { observe: 'response' })
      .pipe(
        map((res: HttpResponse<any>) => res.status === 200),
        catchError(this.errorHandler)
      );
  }
}

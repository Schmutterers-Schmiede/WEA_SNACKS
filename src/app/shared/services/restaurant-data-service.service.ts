import { Injectable } from '@angular/core';
import { Restaurant } from '../Entities/Restaurant';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { getDistance, convertDistance} from 'geolib';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestaurantDataService {

  constructor(private httpClient:HttpClient) { 
    this.getUserLocation();
  }

  latitude!:number;
  longitude!:number;

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  } 

  private getUserLocation():void{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
      });
    } else {
      console.log('geolocation not supported');      
    }
  }
  
  getAllRestaurants():Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${environment.server}/restaurants`)
      .pipe(
        map((restaurants:Restaurant[]) =>{          
          
          restaurants.forEach((restaurant:Restaurant) => {
            if(restaurant.latitude !== null && restaurant.longitude !== null){
              restaurant.distance = convertDistance(
                getDistance(
                {latitude: this.latitude, longitude: this.longitude},
                {latitude: restaurant.latitude!, longitude: restaurant.longitude!}
                ), 'km');
              }
          });

          restaurants.sort((a:Restaurant, b:Restaurant) =>{
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

  restaurantExistsForUser(userName:string):Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.server}/restaurants/ExistsForUser/${userName}`)
    .pipe(catchError(this.errorHandler));
  }

  getRestaurantById(id:string): Observable<Restaurant>{
    return this.httpClient.get<Restaurant>(`${environment.server}/restaurants/${id}`)
    .pipe(catchError(this.errorHandler));
  }

  getRestaurantForUsername(username:string): Observable<Restaurant>{
    return this.httpClient.get<Restaurant>(`${environment.server}/restaurants/forUser/${username}`)
    .pipe(catchError(this.errorHandler));
  }
}

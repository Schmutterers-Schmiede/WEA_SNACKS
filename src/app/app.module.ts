import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { RestaurantListItemComponent } from './shared/components/restaurant-list-item/restaurant-list-item.component';
import { RestaurantListComponent } from './shared/components/restaurant-list/restaurant-list.component';
import { HomeComponent } from './shared/components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantMenuComponent } from './shared/components/restaurant-menu/restaurant-menu.component';
import { MenuListItemComponent } from './shared/components/menu-list-item/menu-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListItemComponent,
    RestaurantListComponent,
    HomeComponent,
    RestaurantMenuComponent,
    MenuListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './shared/components/shopping-cart-item/shopping-cart-item.component';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OrderListItemComponent } from './shared/components/order-list-item/order-list-item.component';
import { OrderListComponent } from './shared/components/order-list/order-list.component';
import { UserOrdersComponent } from './shared/components/user-orders/user-orders.component';
import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';
import { OrderMenuItemListComponent } from './shared/components/order-menu-item-list/order-menu-item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListItemComponent,
    RestaurantListComponent,
    HomeComponent,
    RestaurantMenuComponent,
    MenuListItemComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    OrderListItemComponent,
    OrderListComponent,
    UserOrdersComponent,
    OrderDetailsComponent,
    OrderMenuItemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

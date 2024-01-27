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
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { RegistrationSuccessComponent } from './shared/components/registration-success/registration-success.component';

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
    LoginComponent,
    RegisterComponent,
    RegistrationSuccessComponent
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

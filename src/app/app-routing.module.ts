import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './shared/components/restaurant-list/restaurant-list.component';
import { RestaurantMenuComponent } from './shared/components/restaurant-menu/restaurant-menu.component';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { RegistrationSuccessComponent } from './shared/components/registration-success/registration-success.component';
import { UserOrdersComponent } from './shared/components/user-orders/user-orders.component';
import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'restaurants',
    pathMatch: 'full',
  },
  {
    path:'index.html',
    redirectTo: 'restaurants',
    pathMatch: 'full'
  },
  {
    path:'restaurants',
    component: RestaurantListComponent
  },
  {
    path:'restaurants/:id',
    component: RestaurantMenuComponent
  },
  {
    path:'cart',
    component: ShoppingCartComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'registrationSuccess',
    component: RegistrationSuccessComponent
  },
  {
    path: 'userOrders',
    component: UserOrdersComponent
  },
  {
    path: 'userOrders/:id',
    component: OrderDetailsComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

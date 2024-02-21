import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './shared/components/restaurant-list/restaurant-list.component';
import { RestaurantMenuComponent } from './shared/components/restaurant-menu/restaurant-menu.component';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';
import { UserOrdersComponent } from './shared/components/user-orders/user-orders.component';
import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';
import { RestaurantManagementComponent } from './shared/components/restaurant-management/restaurant-management.component';
import { RestaurantEditComponent } from './shared/components/restaurant-edit/restaurant-edit.component';

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
    path: 'userOrders',
    component: UserOrdersComponent
  },
  {
    path: 'userOrders/:id',
    component: OrderDetailsComponent
  },
  {
    path: 'RestaurantManagement',
    component: RestaurantManagementComponent,
    children: [
      {path: 'editRestaurant', component: RestaurantEditComponent}

    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

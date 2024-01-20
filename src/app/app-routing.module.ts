import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { RestaurantListComponent } from './shared/components/restaurant-list/restaurant-list.component';
import { RestaurantMenuComponent } from './shared/components/restaurant-menu/restaurant-menu.component';
import { ShoppingCartComponent } from './shared/components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'restaurants',
    pathMatch: 'full',
  },
  {
    path:'intex.html',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { RestaurantListComponent } from './shared/components/restaurant-list/restaurant-list.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'intex.html',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: RestaurantListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

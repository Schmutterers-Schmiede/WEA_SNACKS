import { MenuItem } from "../Entities/MenuItem";

export interface ShoppingCartItem {
  restaurantId?:string;
  item:MenuItem;
  amount:number;
}
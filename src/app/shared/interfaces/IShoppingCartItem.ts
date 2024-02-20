import { MenuItem } from "../Entities/MenuItem";

export interface IShoppingCartItem {
  restaurantId?:string;
  item:MenuItem;
  amount:number;
}
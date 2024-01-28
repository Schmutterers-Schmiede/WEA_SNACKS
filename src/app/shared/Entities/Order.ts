import { MenuItem } from "./MenuItem";

export class Order{
  constructor(
    public id:string,
    public restaurantId:string,
    public userAccessToken:string,
    public address:string,
    public status:string,
    public placedAt:Date,
    public menuItems:MenuItem[],
  ){

  }
}
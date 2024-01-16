export class MenuItem {
  id:string;
  name:string;
  category:string;
  description:string;
  price:number;

  constructor(id:string, name:string, category:string, description:string, price:number){
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
  }
}
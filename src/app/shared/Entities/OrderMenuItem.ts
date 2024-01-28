export class OrderMenuItem{
  constructor(
    public id:string,
    public name:string,
    public category:string,
    public description:string,
    public price:number,
    public amount:number
  ){}
}
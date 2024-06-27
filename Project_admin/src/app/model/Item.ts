export class Item {
  // constructor(public id?:string, public name?:string, public description?:string)
  // {

  // }
  id: number;
  name: string;
  img: string;
  quantity: number;
  description: string;
  price: number;
  houseware: number;

  constructor(
    id?: number,
    name?: string,
    img?: string,
    quantity?: number,
    description?: string,
    price?: number,
    houseware?: number
  ) {
    this.id = id ?? 0;
    this.name = name || '';
    this.img = img || '';
    this.quantity = quantity ?? 0;
    this.description = description || '';
    this.price = price ?? 0;
    this.houseware = houseware ?? 0;
  }
  toPlainObject(): object {
    return {
      id: this.id,
      name: this.name,
      img: this.img,
      quantity: this.quantity,
      description: this.description,
      price: this.price,
      houseware: this.houseware
    };
  }
}

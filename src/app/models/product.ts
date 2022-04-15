import { CustomizedProduct } from './customized-product';
import { StandardProduct } from './standard-product';

export abstract class Product {
  productId: number | undefined;
  name: string | undefined;
  description: string | undefined;
  image: string | undefined;

  constructor(
    productId?: number,
    name?: string,
    description?: string,
    image?: string
  ) {
    this.productId = productId;
    this.name = name;
    this.description = description;
    this.image = image;
  }
}

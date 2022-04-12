import { CustomizedProduct } from "./customized-product";
import { StandardProduct } from "./standard-product";

export abstract class Product {
    productId: number | undefined;
    name: string | undefined;
    description: string | undefined;
    image: string | undefined;
    // unitCost: number = -1;
    
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

    // getUnitCost() {
    //     if (this instanceof StandardProduct) {
    //         this.unitCost = (<StandardProduct>this).unitPrice || -1;
    //     } else if (this instanceof CustomizedProduct) {
    //         this.unitCost = (<CustomizedProduct>this).totalPrice || -1;
    //     }
    //     return this.unitCost || -1;
    // }
}

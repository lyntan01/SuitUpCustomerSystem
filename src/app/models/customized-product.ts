import { Product } from "./product";

export class CustomizedProduct extends Product {
    basePrice: number | undefined;
    totalPrice: number | undefined;
    gender: string | undefined;
    
    constructor(
        productId?: number,
        name?: string,
        description?: string,
        image?: string,
        basePrice?: number,
        totalPrice?: number,
        gender?: string
    ) {
        super(productId, name, description, image);
        this.basePrice = basePrice;
        this.totalPrice = totalPrice;
        this.gender = gender;
    }
}

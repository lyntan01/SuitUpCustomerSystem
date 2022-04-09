import { Category } from "./category";
import { Product } from "./product";
import { Tag } from "./tag";

export class StandardProduct extends Product {
    skuCode: string | undefined;
    unitPrice: number | undefined;
    quantityInStock: number | undefined;
    reorderQuantity: number | undefined;
    category: Category | undefined;
    tags: Tag[] | undefined;
    
    constructor(
        productId?: number,
        name?: string,
        description?: string,
        image?: string,
        skuCode?: string,
        unitPrice?: number,
        quantityInStock?: number,
        reorderQuantity?: number
    ) {
        super(productId, name, description, image);
        this.skuCode = skuCode;
        this.unitPrice = unitPrice;
        this.quantityInStock = quantityInStock;
        this.reorderQuantity = reorderQuantity;
    }
}

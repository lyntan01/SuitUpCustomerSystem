import { StandardProduct } from './standard-product';

export class Category {
    categoryId: number | undefined;
    name: string | undefined;
    description: string | undefined;
    standardProducts: StandardProduct[] | undefined;
    
    constructor(
        categoryId?: number,
        name?: string,
        description?: string
    ) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
    }
}

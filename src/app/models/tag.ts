import { StandardProduct } from './standard-product';

export class Tag {
    tagId: number | undefined;
    name: string | undefined;
    standardProducts: StandardProduct[] | undefined;
    
    constructor(
        tagId?: number,
        name?: string,
    ) {
        this.tagId = tagId;
        this.name = name;
    }
}

import { Customization } from "./customization";

export class PocketStyle extends Customization {
    
    constructor(
        customizationId?: number,
        name?: string,
        additionalPrice?: number,
        description?: string,
        image?: string,
        isDisabled?: boolean
    ) {
        super(customizationId, name, additionalPrice, description, image, isDisabled);
    }
}

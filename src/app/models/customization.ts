export abstract class Customization {
    customizationId: number | undefined;
    name: string | undefined;
    additionalPrice: number | undefined;
    description: string | undefined;
    image: string | undefined;
    isDisabled: boolean | undefined;
    
    constructor(
        customizationId?: number,
        name?: string,
        additionalPrice?: number,
        description?: string,
        image?: string,
        isDisabled?: boolean
    ) {
        this.customizationId = customizationId;
        this.name = name;
        this.additionalPrice = additionalPrice;
        this.description = description;
        this.image = image;
        this.isDisabled = isDisabled;
    }
}

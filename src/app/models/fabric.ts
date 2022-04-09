import { Colour } from "./colour";
import { Customization } from "./customization";

export class Fabric extends Customization {

    colour: Colour | undefined;

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

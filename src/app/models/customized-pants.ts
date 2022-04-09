import { CustomizedProduct } from "./customized-product";
import { Fabric } from "./fabric";
import { PantsCutting } from "./pants-cutting";
import { PantsMeasurement } from "./pants-measurement";

export class CustomizedPants extends CustomizedProduct {
    fabric: Fabric | undefined;
    pantsCutting: PantsCutting | undefined;
    pantsMeasurement: PantsMeasurement | undefined;

    constructor(
        productId?: number,
        name?: string,
        description?: string,
        image?: string,
        basePrice?: number,
        totalPrice?: number,
        gender?: string
    ) {
        super(productId, name, description, image, basePrice, totalPrice, gender);
    }
}

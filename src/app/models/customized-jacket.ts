import { CustomizedProduct } from "./customized-product";
import { Fabric } from "./fabric";
import { JacketMeasurement } from "./jacket-measurement";
import { JacketStyle } from "./jacket-style";
import { PocketStyle } from "./pocket-style";

export class CustomizedJacket extends CustomizedProduct {
    pocketStyle: PocketStyle | undefined;
    jacketStyle: JacketStyle | undefined;
    innerFabric: Fabric | undefined;
    outerFabric: Fabric | undefined;
    jacketMeasurement: JacketMeasurement | undefined;
    
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

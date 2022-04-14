import { Product } from './product';

export class OrderLineItem {
    orderLineItemId: number | undefined;
    quantity: number | undefined;
    subTotal: number | undefined;
    product: Product | undefined;
    
    constructor(
        orderLineItemId?: number,
        quantity?: number,
        subTotal?: number,
        product?: Product // FOR TESTING
    ) {
        this.orderLineItemId = orderLineItemId;
        this.quantity = quantity;
        this.subTotal = subTotal;
        this.product = product; // FOR TESTING
    }
}

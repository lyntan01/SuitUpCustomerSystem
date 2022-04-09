import { Address } from "./address";
import { Customer } from "./customer";
import { CollectionMethodEnum } from "./enum/collection-method-enum";
import { OrderStatusEnum } from "./enum/order-status-enum";
import { OrderLineItem } from "./order-line-item";
import { Promotion } from "./promotion";
import { Transaction } from "./transaction";

export class Order {
    orderId: number | undefined;
    serialNumber: string | undefined;
    totalLineItem: number | undefined;
    totalQuantity: number | undefined;
    totalAmount: number | undefined;
    orderDateTime: Date | undefined;
    expressOrder: boolean | undefined;
    orderStatusEnum: OrderStatusEnum | undefined;
    collectionMethodEnum: CollectionMethodEnum | undefined;

    customer: Customer | undefined;
    deliveryAddress: Address | undefined;
    promotion: Promotion | undefined;
    transaction: Transaction | undefined;
    orderLineItems: OrderLineItem[] | undefined;
    
    constructor(
        orderId?: number,
        serialNumber?: string,
        totalLineItem?: number,
        totalQuantity?: number,
        totalAmount?: number,
        orderDateTime?: Date,
        expressOrder?: boolean,
        orderStatusEnum?: OrderStatusEnum,
        collectionMethodEnum?: CollectionMethodEnum
    ) {
        this.orderId = orderId;
        this.serialNumber = serialNumber;
        this.totalLineItem = totalLineItem;
        this.totalQuantity = totalQuantity;
        this.totalAmount = totalAmount;
        this.orderDateTime = orderDateTime;
        this.expressOrder = expressOrder;
        this.orderStatusEnum = orderStatusEnum;
        this.collectionMethodEnum = collectionMethodEnum;
    }
}

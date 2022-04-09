import { Order } from './order';

export abstract class Promotion {
    promotionId: number | undefined;
    promotionCode: string | undefined;
    maxNumOfUsages: number | undefined;
    minimumSpending: number | undefined;
    expiryDate: Date | undefined;
    discountString: string | undefined;
    orders: Order[] | undefined;
    
    constructor(
        promotionId?: number,
        promotionCode?: string,
        maxNumOfUsages?: number,
        minimumSpending?: number,
        expiryDate?: Date,
        discountString?: string
    ) {
        this.promotionId = promotionId;
        this.promotionCode = promotionCode;
        this.maxNumOfUsages = maxNumOfUsages;
        this.minimumSpending = minimumSpending;
        this.expiryDate = expiryDate;
        this.discountString = discountString;
    }
}

import { Promotion } from "./promotion";

export class AbsolutePromotion extends Promotion {
    absoluteDiscount: number | undefined;
    
    constructor(
        promotionId?: number,
        promotionCode?: string,
        maxNumOfUsages?: number,
        minimumSpending?: number,
        expiryDate?: Date,
        discountString?: string,
        absoluteDiscount?: number
    ) {
        super(promotionId, promotionCode, maxNumOfUsages, minimumSpending, expiryDate, discountString);
        this.absoluteDiscount = absoluteDiscount;
    }
}

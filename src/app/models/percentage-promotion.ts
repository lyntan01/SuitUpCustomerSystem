import { Promotion } from "./promotion";

export class PercentagePromotion extends Promotion {

    percentageDiscount: number | undefined;
    
    constructor(
        promotionId?: number,
        promotionCode?: string,
        maxNumOfUsages?: number,
        minimumSpending?: number,
        expiryDate?: Date,
        discountString?: string,
        percentageDiscount?: number
    ) {
        super(promotionId, promotionCode, maxNumOfUsages, minimumSpending, expiryDate, discountString);
        this.percentageDiscount = percentageDiscount;
    }
}

export class CreditCard {
  creditCardId: number | undefined;
  holderName: string | undefined;
  cardNumber: string | undefined;
  cvv: string | undefined;
  expiryDate: Date | undefined;

  constructor(
    creditCardId?: number,
    holderName?: string,
    cardNumber?: string,
    cvv?: string,
    expiryDate?: Date
  ) {
    this.creditCardId = creditCardId;
    this.holderName = holderName;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
  }
}

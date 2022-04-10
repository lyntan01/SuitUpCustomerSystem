import { CreditCard } from './credit-card';

export class UpdateCreditCardReq {
  email: string | undefined;
  password: string | undefined;
  newCreditCard: CreditCard | undefined;
  expireDate: Number | undefined;

  constructor(
    email?: string,
    password?: string,
    newCreditCard?: CreditCard,
    expireDate?: Number
  ) {
    this.email = email;
    this.password = password;
    this.newCreditCard = newCreditCard;
    this.expireDate = expireDate;
  }
}

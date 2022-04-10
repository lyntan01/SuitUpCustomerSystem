import { CreditCard } from './credit-card';

export class UpdateCreditCardReq {
  email: string | undefined;
  password: string | undefined;
  newCreditCard: CreditCard | undefined;
  expireDate: Date | undefined;

  constructor(
    email?: string,
    password?: string,
    newCreditCard?: CreditCard,
    expireDate?: Date
  ) {
    this.email = email;
    this.password = password;
    this.newCreditCard = newCreditCard;
    this.expireDate = expireDate;
  }
}

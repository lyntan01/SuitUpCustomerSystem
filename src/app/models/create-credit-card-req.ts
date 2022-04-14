import { CreditCard } from './credit-card';

export class CreateCreditCardReq {
  email: string | undefined;
  password: string | undefined;
  newCreditCard: CreditCard | undefined;

  constructor(email?: string, password?: string, newCreditCard?: CreditCard) {
    this.email = email;
    this.password = password;
    this.newCreditCard = newCreditCard;
  }
}

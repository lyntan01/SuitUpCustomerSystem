import { Order } from './order';

export class ApplyPromotionCodeReq {
  email: string | undefined;
  password: string | undefined;
  order: Order | undefined;
  promotionCode: string | undefined;

  constructor(
    email?: string,
    password?: string,
    order?: Order,
    promotionCode?: string
  ) {
    this.email = email;
    this.password = password;
    this.order = order;
    this.promotionCode = promotionCode;
  }
}

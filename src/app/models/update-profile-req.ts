import { Customer } from './customer';

export class UpdateProfileReq {
  currentCustomer: Customer | undefined;

  constructor(currentCustomer?: Customer) {
    this.currentCustomer = currentCustomer;
  }
}

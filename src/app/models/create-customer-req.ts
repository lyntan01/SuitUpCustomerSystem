import { Customer } from './customer';

export class CreateCustomerReq {
  newCustomer: Customer | undefined;

  constructor(newCustomer?: Customer) {
    this.newCustomer = newCustomer;
  }
}

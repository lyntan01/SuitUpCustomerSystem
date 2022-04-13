import { CreditCard } from './credit-card';
import { Order } from './order';
import { Address } from './address';
import { Appointment } from './appointment';
import { SupportTicket } from './support-ticket';
import { JacketMeasurement } from './jacket-measurement';
import { PantsMeasurement } from './pants-measurement';

export class Customer {
  customerId: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  contactNumber: string | undefined;
  fullName: string = '';
  appointments: Appointment[] | undefined;
  creditCards: CreditCard[] | undefined;
  orders: Order[] | undefined;
  addresses: Address[] | undefined;
  supportTickets: SupportTicket[] | undefined;
  jacketMeasurement: JacketMeasurement | undefined;
  pantsMeasurement: PantsMeasurement | undefined;

  constructor(
    customerId?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    contactNumber?: string
  ) {
    this.customerId = customerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.contactNumber = contactNumber;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

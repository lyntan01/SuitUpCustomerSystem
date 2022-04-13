import { Appointment } from './appointment';
import { Customer } from './customer';
import { Store } from './store';

export class CreateAppointmentReq {
  customer: Customer | undefined;
  appointment: Appointment | undefined;
  store: Store | undefined;
  password: string | undefined;

  constructor(
    customer?: Customer,
    appointment?: Appointment,
    store?: Store,
    password?: string
  ) {
    this.customer = customer;
    this.appointment = appointment;
    this.store = store;
    this.password = password;
  }
}

import { AppointmentTypeEnum } from './enum/appointment-type-enum';
import { Store } from './store';
import { Customer } from './customer';
import { Transaction } from './transaction';

export class Appointment {
    appointmentId: number | undefined;
    appointmentDateTime: Date | undefined;
    appointmentTypeEnum: AppointmentTypeEnum | undefined;
    isFree: boolean | undefined;
    store: Store | undefined;
    customer: Customer | undefined;
    transaction: Transaction | undefined;
    
    constructor(
        appointmentId?: number,
        appointmentDateTime?: Date,
        appointmentTypeEnum?: AppointmentTypeEnum,
        isFree?: boolean,
    ) {
        this.appointmentId = appointmentId;
        this.appointmentDateTime = appointmentDateTime;
        this.appointmentTypeEnum = appointmentTypeEnum;
        this.isFree = isFree;
    }
}

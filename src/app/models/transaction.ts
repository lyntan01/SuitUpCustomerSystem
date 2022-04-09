import { Order } from './order';
import { Appointment } from './appointment';

export class Transaction {
    transactionId: number | undefined;
    totalAmount: number | undefined;
    paymentDate: Date | undefined;
    voidRefund: boolean | undefined;
    appointment: Appointment | undefined;
    order: Order | undefined;
    
    constructor(
        transactionId?: number,
        totalAmount?: number,
        paymentDate?: Date,
        voidRefund?: boolean
    ) {
        this.transactionId = transactionId;
        this.totalAmount = totalAmount;
        this.paymentDate = paymentDate;
        this.voidRefund = voidRefund;
    }
}

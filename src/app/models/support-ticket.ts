import { Customer } from './customer';

export class SupportTicket {
    ticketId: number | undefined;
    name: string | undefined;		
    description: string | undefined;
    dateTime: Date | undefined;
    isResolved: boolean | undefined;
    staffReply: string | undefined;
    customer: Customer | undefined;

    constructor(
        ticketId?: number,
        name?: string,		
        description?: string,
        dateTime?: Date,
        isResolved?: boolean,
        staffReply?: string,
    ) {
        this.ticketId = ticketId;
        this.name = name;
        this.description = description;
        this.dateTime = dateTime;
        this.isResolved = isResolved;
        this.staffReply = staffReply;
    }
}

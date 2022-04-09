import { SupportTicket } from "./support-ticket";

export class CreateSupportTicketReq {
    email: string | undefined;
    password: string | undefined;
    supportTicket: SupportTicket | undefined;

    constructor(
        email?: string,
        password?: string,
        supportTicket?: SupportTicket
    ) {
        this.email = email;
        this.password = password;
        this.supportTicket = supportTicket;
    }
}

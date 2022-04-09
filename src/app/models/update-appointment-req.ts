import { Appointment } from "./appointment";

export class UpdateAppointmentReq {

    email: string | undefined;
    password: string | undefined;
    appointment: Appointment | undefined;
    storeId: number | undefined;

    constructor(
        email?: string,
        password?: string,
        appointment?: Appointment,
        storeId?: number,
    ) {
        this.email = email;
        this.password = password;
        this.appointment = appointment;
        this.storeId = storeId;
    }
    
}

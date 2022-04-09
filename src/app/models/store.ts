import { Address } from './address';
import { Appointment } from './appointment';
import { Staff } from './staff';

export class Store {
    storeId: number | undefined;
    storeName: string | undefined;
    storeDescription: string | undefined;
    openingHour: string | undefined;
    closingHour: string | undefined;
    contactNumber: string | undefined;
    address: Address | undefined;
    appointments: Appointment[] | undefined;
    staff: Staff[] | undefined;

    constructor(
        storeId?: number,
        storeName?: string,
        storeDescription?: string,
        openingHour?: string,
        closingHour?: string,
        contactNumber?: string,
    ) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.storeDescription = storeDescription;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
        this.contactNumber = contactNumber;
    }
}

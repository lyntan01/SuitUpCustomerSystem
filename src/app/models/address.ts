export class Address {
    addressId: number | undefined;
    name: string | undefined;
    phoneNumber: string | undefined;
    addressLineOne: string | undefined;
    addressLineTwo: string | undefined;
    postalCode: string | undefined;
    
    constructor(
        addressId?: number,
        name?: string,
        phoneNumber?: string,
        addressLineOne?: string,
        addressLineTwo?: string,
        postalCode?: string
    ) {
        this.addressId = addressId;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.addressLineOne = addressLineOne;
        this.addressLineTwo = addressLineTwo;
        this.postalCode = postalCode;
    }
}

import { Address } from "./address";

export class CreateAddressReq {
    email: string | undefined;
    password: string | undefined;
    address: Address | undefined;

    constructor(
        email?: string,
        password?: string,
        address?: Address
    ) {
        this.email = email;
        this.password = password;
        this.address = address;
    }
}

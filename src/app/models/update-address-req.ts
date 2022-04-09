import { Address } from "./address";

export class UpdateAddressReq {
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

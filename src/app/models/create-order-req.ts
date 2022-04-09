import { Order } from "./order";

export class CreateOrderReq {

    email: string | undefined;
    password: string | undefined;
    order: Order | undefined;
    addressId: number | undefined;

    constructor(
        email?: string,
        password?: string,
        order?: Order,
        addressId?: number,
    ) {
        this.email = email;
        this.password = password;
        this.order = order;
        this.addressId = addressId;
    }

}

import { CustomerDto } from "../dto/customerDto";

export class CustomerFactory {

    static createCustomer(obj: any) {
        return new CustomerDto(obj);
    }

}
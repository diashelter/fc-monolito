import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./invoice-item.entity";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private name: string;
    private document: string;
    private address: Address;
    private items: InvoiceItems[];

    constructor(props: InvoiceProps) {
        super(props.id);
        this.name = props.name;
        this.document = props.document;
        this.address = props.address;
        this.items = props.items;
    }

    getName(): string {
        return this.name;
    }

    getDocument(): string {
        return this.document;
    }

    getAddress(): Address {
        return this.address;
    }

    getItems(): InvoiceItems[] {
        return this.items;
    }

    getTotal(): number {
        return this.items.reduce((acc, item) => acc + item.getPrice(), 0);
    }
}
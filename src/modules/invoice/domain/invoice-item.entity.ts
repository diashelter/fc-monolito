import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemsProps = {
    id?: Id;
    name: string;
    price: number;
};

export default class InvoiceItems extends BaseEntity implements AggregateRoot {
    private name: string;
    private price: number;

    constructor(props: InvoiceItemsProps) {
        super(props.id);
        this.name = props.name;
        this.price = props.price;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }
}
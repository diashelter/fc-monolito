import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"

type TransactionProps = {
    id?: Id;
    amount: number;
    orderId: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Transaction extends BaseEntity implements AggregateRoot {
    private amount: number;
    private orderId: string;
    private status: string;

    constructor(props: TransactionProps) {
        super(props.id);
        this.amount = props.amount;
        this.orderId = props.orderId;
        this.status = props.status || "pending";
        this.validate();
    }

    validate(): void {
        if (this.amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
    }

    approve(): void {
        this.status = "approved";
    }

    decline(): void {
        this.status = "declined";
    }

    process(): void {
        if (this.amount >= 100) {
            this.approve();
        } else {
            this.decline();
        }
    }

    getAmount(): number {
        return this.amount;
    }

    getOrderId(): string {
        return this.orderId;
    }

    getStatus(): string {
        return this.status;
    }
}
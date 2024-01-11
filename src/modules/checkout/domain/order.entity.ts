import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
    id?: Id;
    client: Client;
    products: Product[];
    status?: string;
};

export default class Order extends BaseEntity {
    private client: Client;
    private products: Product[];
    private status: string;

    constructor(props: OrderProps) {
        super(props.id);
        this.client = props.client;
        this.products = props.products;
        this.status = props.status || "pending";
    }

    approved(): void {
        this.status = "approved";
    }

    getClient(): Client {
        return this.client;
    }

    getStatus(): string {
        return this.status;
    }


    getProducts(): Product[] {
        return this.products;
    }

    getTotal(): number {
        return this.products.reduce((total, product) => total + product.getSalesPrice(), 0);
    }
}
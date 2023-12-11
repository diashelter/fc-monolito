import AgregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductPros = {
    id?: Id;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}


export default class Product extends BaseEntity implements AgregateRoot {

    private name: string;
    private description: string;
    private purchasePrice: number;
    private stock: number;

    constructor(props: ProductPros) {
        super(props.id);
        this.name = props.name;
        this.description = props.description;
        this.purchasePrice = props.purchasePrice;
        this.stock = props.stock;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getPurchasePrice() {
        return this.purchasePrice;
    }

    getStock() {
        return this.stock;
    }
}
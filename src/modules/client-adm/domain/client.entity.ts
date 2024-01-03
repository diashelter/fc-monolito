import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Address from "../../@shared/domain/value-object/address"
import Id from "../../@shared/domain/value-object/id.value-object"

type ClientProps = {
    id?: Id
    name: string
    email: string
    document: string
    address: Address
    createdAt?: Date
    updatedAt?: Date
}

export default class Client extends BaseEntity implements AggregateRoot {

    private name: string
    private email: string
    private document: string
    private address: Address

    constructor(props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt)
        this.name = props.name
        this.email = props.email
        this.document = props.document
        this.address = props.address
    }

    getName(): string {
        return this.name
    }

    getEmail(): string {
        return this.email
    }

    getDocument(): string {
        return this.document
    }

    getAddress(): Address {
        return this.address
    }

}
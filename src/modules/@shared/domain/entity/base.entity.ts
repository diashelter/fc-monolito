import Id from "../value-object/id.value-object";

export default class BaseEntity {
    private id: Id;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(id?: Id, createdAt?: Date, updatedAt?: Date) {
        this.id = id || new Id();
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    getId(): Id {
        return this.id;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    setUpdatedAt(updatedAt: Date) {
        this.updatedAt = updatedAt;
    }
}
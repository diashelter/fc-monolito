import ValueObject from "./value-object.interface";
import { v4 as uuidv4 } from "uuid";

export default class Id implements ValueObject {
    private id: string;

    constructor(id?: string) {
        this.id = id || uuidv4();
    }

    getId(): string {
        return this.id;
    }
}
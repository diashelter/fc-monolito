import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
    street: string = ""
    number: string = ""
    complement: string = ""
    city: string = ""
    state: string = ""
    zipCode: string = ""

    constructor(street: string, number: string, complement: string, city: string, state: string, zipCode: string) {
        this.street = street
        this.number = number
        this.complement = complement
        this.city = city
        this.state = state
        this.zipCode = zipCode
    }

    getStreet(): string {
        return this.street
    }

    getNumber(): string {
        return this.number
    }

    getComplement(): string {
        return this.complement
    }

    getCity(): string {
        return this.city
    }

    getState(): string {
        return this.state
    }

    getZipCode(): string {
        return this.zipCode
    }

    validate() {
        if (this.street.length === 0) {
            throw new Error("Street is required")
        }
        if (this.number.length === 0) {
            throw new Error("Number is required")
        }
        if (this.complement.length === 0) {
            throw new Error("Complement is required")
        }
        if (this.city.length === 0) {
            throw new Error("City is required")
        }
        if (this.state.length === 0) {
            throw new Error("State is required")
        }
        if (this.zipCode.length === 0) {
            throw new Error("Zip code is required")
        }
    }
}
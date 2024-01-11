import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../../src/modules/invoice/factory/invoice.facade.factory";
import { InvoiceModel } from "../../src/modules/invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../../src/modules/invoice/repository/invoice-items.model";

describe("Invoice Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {
        const input = {
            name: "Invoice test",
            document: "123456789",
            street: "street",
            number: "123",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "item 1",
                    price: 10,
                },
                {
                    id: "2",
                    name: "item 2",
                    price: 20,
                },
            ],
        };

        const facade = InvoiceFacadeFactory.create();
        const output = await facade.create(input);

        expect(output).toBeDefined();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.street);
        expect(output.number).toBe(input.number);
        expect(output.complement).toBe(input.complement);
        expect(output.city).toBe(input.city);
        expect(output.state).toBe(input.state);
        expect(output.zipCode).toBe(input.zipCode);
        expect(output.items.length).toBe(input.items.length);
        expect(output.total).toBe(30);
    });

    it("should find a invoice", async () => {
        const input = {
            name: "Invoice test",
            document: "123456789",
            street: "street",
            number: "123",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "item 1",
                    price: 10,
                },
                {
                    id: "2",
                    name: "item 2",
                    price: 20,
                },
            ],
        };

        const facade = InvoiceFacadeFactory.create();
        const output = await facade.create(input);
        const result = await facade.find({ id: output.id });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.address.street).toBe(input.street);
        expect(result.address.number).toBe(input.number);
        expect(result.address.complement).toBe(input.complement);
        expect(result.address.city).toBe(input.city);
        expect(result.address.state).toBe(input.state);
        expect(result.address.zipCode).toBe(input.zipCode);
        expect(result.items.length).toBe(input.items.length);
        expect(result.total).toBe(30);
    });
});
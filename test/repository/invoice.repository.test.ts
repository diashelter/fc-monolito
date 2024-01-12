import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../../src/modules/invoice/repository/invoice.model";
import { InvoiceItemModel } from "../../src/modules/invoice/repository/invoice-item.model";
import InvoiceRepository from "../../src/modules/invoice/repository/invoice.repository";
import Invoice from "../../src/modules/invoice/domain/invoice.entity";
import Id from "../../src/modules/@shared/domain/value-object/id.value-object";
import Address from "../../src/modules/@shared/domain/value-object/address";
import InvoiceItems from "../../src/modules/invoice/domain/invoice-item.entity";

describe("Invoice Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new invoice", async () => {
        const repository = new InvoiceRepository();
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice Teste",
            document: "12345678901",
            address: new Address(
                "Rua Teste",
                "123",
                "complemento",
                "City",
                "State",
                "12345678",
            ),
            items: [
                new InvoiceItems({
                    id: new Id("1"),
                    name: "Teste",
                    price: 10,
                }),
                new InvoiceItems({
                    id: new Id("2"),
                    name: "Teste 2",
                    price: 20,
                }),
            ],
        });
        await repository.generate(invoice);

        const resultInvoiceDb = await InvoiceModel.findOne({
            where: { id: "1" },
            include: [InvoiceItemModel],
        });

        expect(resultInvoiceDb).toBeDefined();
        expect(resultInvoiceDb.id).toBe(invoice.getId().getId());
        expect(resultInvoiceDb.name).toBe(invoice.getName());
        expect(resultInvoiceDb.document).toBe(invoice.getDocument());
        expect(resultInvoiceDb.street).toBe(invoice.getAddress().getStreet());
        expect(resultInvoiceDb.number).toBe(invoice.getAddress().getNumber());
        expect(resultInvoiceDb.complement).toBe(invoice.getAddress().getComplement());
        expect(resultInvoiceDb.city).toBe(invoice.getAddress().getCity());
        expect(resultInvoiceDb.state).toBe(invoice.getAddress().getState());
        expect(resultInvoiceDb.zipcode).toBe(invoice.getAddress().getZipCode());
        expect(resultInvoiceDb.items[0].id).toBe(invoice.getItems()[0].getId().getId());
        expect(resultInvoiceDb.items[0].name).toBe(invoice.getItems()[0].getName());
        expect(resultInvoiceDb.items[0].price).toBe(invoice.getItems()[0].getPrice());
        expect(resultInvoiceDb.items[1].id).toBe(invoice.getItems()[1].getId().getId());
        expect(resultInvoiceDb.items[1].name).toBe(invoice.getItems()[1].getName());
        expect(resultInvoiceDb.items[1].price).toBe(invoice.getItems()[1].getPrice());
        expect(resultInvoiceDb.total).toBe(30);
    });

    it("should find an invoice", async () => {
        const ivoiceItems = [
            {
                id: "1",
                name: "Teste",
                price: 10,
            },
            {
                id: "2",
                name: "Teste 2",
                price: 20,
            },
        ];
        const invoiceDb = await InvoiceModel.create({
            id: "1",
            name: "Invoice Name",
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888-888",
            createdAt: new Date(),
            items: ivoiceItems.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
            total: 30,
        }, {
            include: [InvoiceItemModel],
        });

        const repository = new InvoiceRepository();
        const result = await repository.find(invoiceDb.id);

        expect(result).toBeDefined();
        expect(result.getId().getId()).toBe(invoiceDb.id);
        expect(result.getName()).toBe(invoiceDb.name);
        expect(result.getDocument()).toBe(invoiceDb.document);
        expect(result.getAddress().getStreet()).toBe(invoiceDb.street);
        expect(result.getAddress().getNumber()).toBe(invoiceDb.number);
        expect(result.getAddress().getComplement()).toBe(invoiceDb.complement);
        expect(result.getAddress().getCity()).toBe(invoiceDb.city);
        expect(result.getAddress().getState()).toBe(invoiceDb.state);
        expect(result.getAddress().getZipCode()).toBe(invoiceDb.zipcode);
        expect(result.getItems()[0].getId().getId()).toBe(invoiceDb.items[0].id);
        expect(result.getItems()[0].getName()).toBe(invoiceDb.items[0].name);
        expect(result.getItems()[0].getPrice()).toBe(invoiceDb.items[0].price);
        expect(result.getItems()[1].getId().getId()).toBe(invoiceDb.items[1].id);
        expect(result.getItems()[1].getName()).toBe(invoiceDb.items[1].name);
        expect(result.getItems()[1].getPrice()).toBe(invoiceDb.items[1].price);
        expect(result.getTotal()).toBe(30);
    });
});
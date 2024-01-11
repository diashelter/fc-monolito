import Address from "../../src/modules/@shared/domain/value-object/address";
import Id from "../../src/modules/@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../src/modules/invoice/domain/invoice-item.entity";
import Invoice from "../../src/modules/invoice/domain/invoice.entity"
import FindInvoiceUseCase from "../../src/modules/invoice/usecase/find-invoice/find-invoice.usecase"

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice Name",
    document: "01234567891",
    address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888",
    ),
    items: [
        new InvoiceItems({
            id: new Id("inv_1"),
            name: "Item da Invoice 1",
            price: 100,
        }),
        new InvoiceItems({
            id: new Id("inv_2"),
            name: "Item da Invoice 2",
            price: 200,
        }),
    ]
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("Find Invoice use case unit test", () => {

    it("should find a invoice", async () => {

        const repository = MockRepository()
        const usecase = new FindInvoiceUseCase(repository)

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(invoice.getName())
        expect(result.document).toEqual(invoice.getDocument())
        expect(result.address).toEqual(invoice.getAddress())
        expect(result.items.length).toBe(invoice.getItems().length)
        expect(result.createdAt).toEqual(invoice.getCreatedAt())
    })
})
import Address from "../../src/modules/@shared/domain/value-object/address"
import GenerateInvoiceUseCase from "../../src/modules/invoice/usecase/generate-invoice/generate-invoice.usecase"

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    }
}

describe("Generate Invoice use case unit test", () => {

    it("should generate a invoice", async () => {

        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)

        const input = {
            name: "Invoice Name",
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipCode: "88888-888",
            items: [
                {
                    id: "inv_1",
                    name: "Item da Invoice 1",
                    price: 100,
                },
                {
                    id: "inv_2",
                    name: "Item da Invoice 2",
                    price: 200,
                }
            ]
        }

        const result = await usecase.execute(input)

        expect(repository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(input.name)
        expect(result.street).toEqual(input.street)
        expect(result.number).toEqual(input.number)
        expect(result.complement).toEqual(input.complement)
        expect(result.city).toEqual(input.city)
        expect(result.state).toEqual(input.state)
        expect(result.zipCode).toEqual(input.zipCode)
        expect(result.items.length).toEqual(input.items.length)
        expect(result.total).toEqual(300)
    })
})
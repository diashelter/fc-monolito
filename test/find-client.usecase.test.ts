import Address from "../src/modules/@shared/domain/value-object/address"
import Id from "../src/modules/@shared/domain/value-object/id.value-object"
import Client from "../src/modules/client-adm/domain/client.entity"
import FindClientUseCase from "../src/modules/client-adm/usecase/find-client/find-client.usecase"


const client = new Client({
    id: new Id("1"),
    name: "Lucian",
    email: "lucian@123.com",
    document: "1234-5678",
    address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888",
    )
})

const MockRepository = () => {

    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe("Find Client use case unit test", () => {

    it("should find a client", async () => {

        const repository = MockRepository()
        const usecase = new FindClientUseCase(repository)

        const input = {
            id: "1"
        }

        const result = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toEqual(input.id)
        expect(result.name).toEqual(client.getName())
        expect(result.email).toEqual(client.getEmail())
        expect(result.address).toEqual(client.getAddress())
        expect(result.createdAt).toEqual(client.getCreatedAt())
        expect(result.updatedAt).toEqual(client.getUpdatedAt())
    })
})
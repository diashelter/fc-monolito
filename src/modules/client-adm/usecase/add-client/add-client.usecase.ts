
import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.dto";

export default class AddClientUseCase {

    constructor(private clientRepository: ClientGateway) {

    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {

        const props = {
            id: new Id(input.id) || new Id(),
            name: input.name,
            email: input.email,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            )
        }

        const client = new Client(props)
        await this.clientRepository.add(client)

        return {
            id: client.getId().getId(),
            name: client.getName(),
            email: client.getEmail(),
            document: client.getDocument(),
            street: client.getAddress().getStreet(),
            number: client.getAddress().getNumber(),
            complement: client.getAddress().getComplement(),
            city: client.getAddress().getCity(),
            state: client.getAddress().getState(),
            zipCode: client.getAddress().getZipCode(),
            createdAt: client.getCreatedAt(),
            updatedAt: client.getUpdatedAt()
        }
    }
}
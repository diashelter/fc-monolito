
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
                input.address.street,
                input.address.number,
                input.address.complement,
                input.address.city,
                input.address.state,
                input.address.zipCode,
            )
        }

        const client = new Client(props)
        await this.clientRepository.add(client)

        return {
            id: client.getId().getId(),
            name: client.getName(),
            email: client.getEmail(),
            document: client.getDocument(),
            address: new Address(
                client.getAddress().getStreet(),
                client.getAddress().getNumber(),
                client.getAddress().getComplement(),
                client.getAddress().getCity(),
                client.getAddress().getState(),
                client.getAddress().getZipCode(),
            ),
            createdAt: client.getCreatedAt(),
            updatedAt: client.getUpdatedAt()
        }
    }
}
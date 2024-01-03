import Address from "../../../@shared/domain/value-object/address";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientUseCaseInputDto, FindClientUseCaseOutputDto } from "./find-client.dto";

export default class FindClientUseCase {

    private clientRepository: ClientGateway

    constructor(clientRepository: ClientGateway) {
        this.clientRepository = clientRepository
    }

    async execute(input: FindClientUseCaseInputDto): Promise<FindClientUseCaseOutputDto> {

        const result = await this.clientRepository.find(input.id)

        return {
            id: result.getId().getId(),
            name: result.getName(),
            email: result.getEmail(),
            document: result.getDocument(),
            address: new Address(
                result.getAddress().getStreet(),
                result.getAddress().getNumber(),
                result.getAddress().getComplement(),
                result.getAddress().getCity(),
                result.getAddress().getState(),
                result.getAddress().getZipCode(),
            ),
            createdAt: result.getCreatedAt(),
            updatedAt: result.getUpdatedAt()
        }
    }
}
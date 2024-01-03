import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {

  async add(entity: Client): Promise<void> {

    await ClientModel.create({
      id: entity.getId().getId(),
      name: entity.getName(),
      email: entity.getEmail(),
      document: entity.getDocument(),
      street: entity.getAddress().getStreet(),
      number: entity.getAddress().getNumber(),
      complement: entity.getAddress().getComplement(),
      city: entity.getAddress().getCity(),
      state: entity.getAddress().getState(),
      zipcode: entity.getAddress().getZipCode(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt()
    })
  }

  async find(id: string): Promise<Client> {

    const client = await ClientModel.findOne({ where: { id } })

    if (!client) {
      throw new Error("Client not found")
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      address: new Address(
        client.street,
        client.number,
        client.complement,
        client.city,
        client.state,
        client.zipcode,
      ),
      createdAt: client.createdAt,
      updatedAt: client.createdAt
    })
  }
}
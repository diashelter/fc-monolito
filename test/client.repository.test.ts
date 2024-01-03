import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../src/modules/client-adm/repository/client.model"
import Client from "../src/modules/client-adm/domain/client.entity"
import Id from "../src/modules/@shared/domain/value-object/id.value-object"
import Address from "../src/modules/@shared/domain/value-object/address"
import ClientRepository from "../src/modules/client-adm/repository/client.repository"


describe("Client Repository test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a client", async () => {

    const client = new Client({
      id: new Id("1"),
      name: "Lucian",
      email: "lucian@teste.com",
      document: "1234-5678",
      address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888"
      ),
    })

    const repository = new ClientRepository()
    await repository.add(client)

    const clientDb = await ClientModel.findOne({ where: { id: "1" } })

    expect(clientDb).toBeDefined()
    expect(clientDb.id).toEqual(client.getId().getId())
    expect(clientDb.name).toEqual(client.getName())
    expect(clientDb.email).toEqual(client.getEmail())
    expect(clientDb.document).toEqual(client.getDocument())
    expect(clientDb.street).toEqual(client.getAddress().getStreet())
    expect(clientDb.number).toEqual(client.getAddress().getNumber())
    expect(clientDb.complement).toEqual(client.getAddress().getComplement())
    expect(clientDb.city).toEqual(client.getAddress().getCity())
    expect(clientDb.state).toEqual(client.getAddress().getState())
    expect(clientDb.zipcode).toEqual(client.getAddress().getZipCode())
    expect(clientDb.createdAt).toStrictEqual(client.getCreatedAt())
    expect(clientDb.updatedAt).toStrictEqual(client.getUpdatedAt())
  })

  it("should find a client", async () => {

    const client = await ClientModel.create({
      id: '1',
      name: 'Lucian',
      email: 'lucian@123.com',
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipcode: "88888-888",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const repository = new ClientRepository()
    const result = await repository.find(client.id)

    expect(result.getId().getId()).toEqual(client.id)
    expect(result.getName()).toEqual(client.name)
    expect(result.getEmail()).toEqual(client.email)
    expect(result.getAddress().street).toEqual(client.street)
    expect(result.getAddress().number).toEqual(client.number)
    expect(result.getAddress().complement).toEqual(client.complement)
    expect(result.getAddress().city).toEqual(client.city)
    expect(result.getAddress().state).toEqual(client.state)
    expect(result.getAddress().zipCode).toEqual(client.zipcode)
    expect(result.getCreatedAt()).toStrictEqual(client.createdAt)
    expect(result.getUpdatedAt()).toStrictEqual(client.updatedAt)
  })
})
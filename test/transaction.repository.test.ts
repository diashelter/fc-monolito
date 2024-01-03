import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../src/modules/payment/repository/transaction.model";
import Transaction from "../src/modules/payment/domain/transaction.entity";
import TransactionRepostiory from "../src/modules/payment/repository/transaction.repository";
import Id from "../src/modules/@shared/domain/value-object/id.value-object";

describe("TransactionRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should save a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    });
    transaction.approve();

    const repository = new TransactionRepostiory();
    const result = await repository.save(transaction);

    expect(result.getId().getId()).toBe(transaction.getId().getId());
    expect(result.getStatus()).toBe("approved");
    expect(result.getAmount()).toBe(transaction.getAmount());
    expect(result.getOrderId()).toBe(transaction.getOrderId());
  });
});
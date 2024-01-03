import transaction from "../domain/transaction.entity";
import Transaction from "../domain/transaction.entity";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepostiory implements PaymentGateway {
    async save(input: transaction): Promise<transaction> {
        await TransactionModel.create({
            id: input.getId().getId(),
            orderId: input.getOrderId(),
            amount: input.getAmount(),
            status: input.getStatus(),
            createdAt: input.getCreatedAt(),
            updatedAt: input.getUpdatedAt(),
        });

        return new Transaction({
            id: input.getId(),
            orderId: input.getOrderId(),
            amount: input.getAmount(),
            status: input.getStatus(),
            createdAt: input.getCreatedAt(),
            updatedAt: input.getUpdatedAt(),
        });
    }
}
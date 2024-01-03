import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction.entity";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
    constructor(private transactionRepository: PaymentGateway) { }

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const transaction = new Transaction({ amount: input.amount, orderId: input.orderId, });
        transaction.process();
        const persistTransaction = await this.transactionRepository.save(transaction);

        return {
            transactionId: persistTransaction.getId().getId(),
            orderId: persistTransaction.getOrderId(),
            amount: persistTransaction.getAmount(),
            status: persistTransaction.getStatus(),
            createdAt: persistTransaction.getCreatedAt(),
            updatedAt: persistTransaction.getUpdatedAt(),
        };
    }
}
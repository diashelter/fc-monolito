import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
    constructor(
        private invoiceGateway: InvoiceGateway
    ) {
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const result = await this.invoiceGateway.find(input.id);
        return {
            id: result.getId().getId(),
            name: result.getName(),
            document: result.getDocument(),
            address: {
                street: result.getAddress().getStreet(),
                number: result.getAddress().getNumber(),
                complement: result.getAddress().getComplement(),
                city: result.getAddress().getCity(),
                state: result.getAddress().getState(),
                zipCode: result.getAddress().getZipCode(),
            },
            items: result.getItems().map((item) => {
                return {
                    id: item.getId().getId(),
                    name: item.getName(),
                    price: item.getPrice()
                };
            }),
            total: result.getTotal(),
            createdAt: result.getCreatedAt(),
        }
    }
}
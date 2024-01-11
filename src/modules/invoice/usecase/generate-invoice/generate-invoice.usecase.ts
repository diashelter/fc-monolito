import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    constructor(private invoiceGateway: InvoiceGateway) {
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            ),
            items: input.items.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                })
            })
        });
        await this.invoiceGateway.generate(invoice);
        return {
            id: invoice.getId().getId(),
            name: invoice.getName(),
            document: invoice.getDocument(),
            street: invoice.getAddress().getStreet(),
            number: invoice.getAddress().getNumber(),
            complement: invoice.getAddress().getComplement(),
            city: invoice.getAddress().getCity(),
            state: invoice.getAddress().getState(),
            zipCode: invoice.getAddress().getZipCode(),
            items: invoice.getItems().map((item) => {
                return {
                    id: item.getId().getId(),
                    name: item.getName(),
                    price: item.getPrice()
                };
            }),
            total: invoice.getTotal(),
        }
    }
}
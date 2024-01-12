import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async find(id: string): Promise<Invoice> {
        return await InvoiceModel.findOne({ where: { id }, include: [InvoiceItemModel] })
            .then((invoice: InvoiceModel) => {
                return new Invoice({
                    id: new Id(invoice.id),
                    name: invoice.name,
                    document: invoice.document,
                    address: new Address(
                        invoice.street,
                        invoice.number,
                        invoice.complement,
                        invoice.city,
                        invoice.state,
                        invoice.zipcode,
                    ),
                    items: invoice.items.map((item: InvoiceItemModel) =>
                        new InvoiceItems({
                            id: new Id(item.id),
                            name: item.name,
                            price: item.price,
                        })
                    ),
                    createdAt: invoice.createdAt,
                });
            });
    }

    async generate(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.getId().getId(),
            name: invoice.getName(),
            document: invoice.getDocument(),
            street: invoice.getAddress().getStreet(),
            number: invoice.getAddress().getNumber(),
            complement: invoice.getAddress().getComplement(),
            city: invoice.getAddress().getCity(),
            state: invoice.getAddress().getState(),
            zipcode: invoice.getAddress().getZipCode(),
            items: invoice.getItems().map((item: InvoiceItems) => ({
                id: item.getId().getId(),
                name: item.getName(),
                price: item.getPrice(),
            })),
            total: invoice.getTotal(),
            createdAt: invoice.getCreatedAt(),
        },
            {
                include: [InvoiceItemModel],
            })
    }

}
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacade from "../../../store-catalog/facade/store-catalog.facade";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.usecase.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private clientFacade: ClientAdmFacadeInterface;
    private productFacade: ProductAdmFacadeInterface;
    private catalogFacade: StoreCatalogFacadeInterface;
    private repository: CheckoutGateway;
    private invoiceFacade: InvoiceFacadeInterface;
    private paymentFacade: PaymentFacadeInterface;


    constructor(
        clientFacade: ClientAdmFacadeInterface,
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogFacadeInterface,
        repository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface
    ) {
        this.clientFacade = clientFacade;
        this.productFacade = productFacade;
        this.catalogFacade = catalogFacade;
        this.repository = repository;
        this.invoiceFacade = invoiceFacade;
        this.paymentFacade = paymentFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this.clientFacade.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found");
        }

        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map((p) => {
                return this.getProduct(p.productId);
            })
        );

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.street,
        });

        const order = new Order({
            client: myClient,
            products: products,
        });

        const payment = await this.paymentFacade.process({
            orderId: order.getId().getId(),
            amount: order.getTotal(),
        });

        const invoice =
            payment.status === "approved"
                ? await this.invoiceFacade.create({
                    name: client.name,
                    document: client.document,
                    street: client.street,
                    complement: client.complement,
                    number: client.number,
                    city: client.city,
                    state: client.state,
                    zipCode: client.zipCode,
                    items: products.map((p) => {
                        return {
                            id: p.getId().getId(),
                            name: p.getName(),
                            price: p.getSalesPrice(),
                        };
                    }),
                })
                : null;

        payment.status === "approved" && order.approved();
        this.repository.addOrder(order);

        return {
            id: order.getId().getId(),
            total: order.getTotal(),
            invoiceId: payment.status === "approved" ? invoice.id : null,
            status: order.getStatus(),
            products: order.getProducts().map((p) => {
                return {
                    productId: p.getId().getId(),
                };
            }),
        };
    }

    private async validateProducts(input: PlaceOrderInputDto) {
        if (input.products.length === 0) {
            throw new Error("No products selected");
        }

        for (const p of input.products) {
            const product = await this.productFacade.checkStock({ productId: p.productId, });
            if (product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`);
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this.catalogFacade.find({ id: productId });
        if (!product) {
            throw new Error("Product not found");
        }
        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        };
        return new Product(productProps);
    }
}
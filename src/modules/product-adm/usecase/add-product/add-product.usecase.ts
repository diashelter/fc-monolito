import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase implements UseCaseInterface {
    constructor(
        private readonly productRepository: ProductGateway
    ) { }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock,
        };
        const product = new Product(props);
        this.productRepository.add(product);
        return {
            id: product.getId().getId(),
            name: product.getName(),
            description: product.getDescription(),
            purchasePrice: product.getPurchasePrice(),
            stock: product.getStock(),
            createdAt: product.getCreatedAt(),
            updatedAt: product.getUpdatedAt()
        }
    }
}
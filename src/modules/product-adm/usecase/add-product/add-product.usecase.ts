import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase {
    constructor(
        private readonly productRepository: ProductGateway
    ) {
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        const props = {
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
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
    constructor(
        private readonly productRepository: ProductGateway
    ) {
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        const product = await this.productRepository.find(input.id);

        return {
            id: product.getId().getId(),
            name: product.getName(),
            description: product.getDescription(),
            salesPrice: product.getSalesPrice(),
        };
    }
}
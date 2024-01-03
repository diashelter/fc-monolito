import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";

export default class FindAllProductsUsecase implements UseCaseInterface {
  constructor(private productRepository: ProductGateway) {}

  async execute(): Promise<any> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.getId().getId(),
        name: product.getName(),
        description: product.getDescription(),
        salesPrice: product.getSalesPrice(),
      })),
    };
  }
}
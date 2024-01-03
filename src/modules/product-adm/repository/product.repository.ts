import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {

    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.getId().getId(),
            name: product.getName(),
            description: product.getDescription(),
            purchasePrice: product.getPurchasePrice(),
            stock: product.getStock(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({
            where: { id: id },
        });

        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        
        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }
}

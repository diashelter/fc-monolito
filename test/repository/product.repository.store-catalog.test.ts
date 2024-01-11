import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../src/modules/store-catalog/repository/product.model";
import ProductRepository from "../../src/modules/store-catalog/repository/product.repository";

describe("ProductRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find all products", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Description 2",
            salesPrice: 200,
        });

        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(products.length).toBe(2);
        expect(products[0].getId().getId()).toBe("1");
        expect(products[0].getName()).toBe("Product 1");
        expect(products[0].getDescription()).toBe("Description 1");
        expect(products[0].getSalesPrice()).toBe(100);
        expect(products[1].getId().getId()).toBe("2");
        expect(products[1].getName()).toBe("Product 2");
        expect(products[1].getDescription()).toBe("Description 2");
        expect(products[1].getSalesPrice()).toBe(200);
    });

    it("should find a product", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Description 1",
            salesPrice: 100,
        });

        const productRepository = new ProductRepository();
        const product = await productRepository.find("1");

        expect(product.getId().getId()).toBe("1");
        expect(product.getName()).toBe("Product 1");
        expect(product.getDescription()).toBe("Description 1");
        expect(product.getSalesPrice()).toBe(100);
    });
});
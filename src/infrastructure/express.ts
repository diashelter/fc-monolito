import express, { Express } from "express";
import { clientRoute } from "./api/client.route";
import { productRoute } from "./api/product.route";
import { invoiceRoute } from "./api/invoice.route";
import { checkoutRoute } from "./api/checkout.route";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import { ProductModel } from "../modules/product-adm/repository/product.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import { InvoiceItemModel } from "../modules/invoice/repository/item.model";

export const app: Express = express();
app.use(express.json());
app.use("/client", clientRoute);
app.use("/product", productRoute);
app.use("/invoice", invoiceRoute);
app.use("/checkout", checkoutRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ClientModel, ProductModel, TransactionModel, InvoiceModel, InvoiceItemModel]);
  await sequelize.sync();
}
setupDb();
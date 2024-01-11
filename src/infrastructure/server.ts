import dotenv from "dotenv";
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import { ProductModel } from "../modules/product-adm/repository/product.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import { InvoiceItemsModel } from "../modules/invoice/repository/invoice-items.model";
import { clientRoute } from "./api/client.route";
import { productRoute } from "./api/product.route";
import { invoiceRoute } from "./api/invoice.route";
import { checkoutRoute } from "./api/checkout.route";

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
  sequelize.addModels([ClientModel, ProductModel, TransactionModel, InvoiceModel, InvoiceItemsModel]);
  await sequelize.sync();
}
setupDb();

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
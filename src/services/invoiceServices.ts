import { ID } from "node-appwrite";
import { databases } from "../config/appWriteClient";



export const createInvoiceService = async (data: any) => {
  const { clientName, amount, vatRate = 0.15 } = data;
  const total = amount + amount * vatRate;

  const result = await databases.createDocument(
    process.env.DB_ID!,
    process.env.COLLECTION_INVOICES!,
    ID.unique(),
    {
      clientName,
      amount,
      vatRate,
      total,
      status: "Unpaid",
    }
  );

  return result;
};

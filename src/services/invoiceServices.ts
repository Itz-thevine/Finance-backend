import { ID, Query } from "node-appwrite";
import { browserClient } from "../config/appWriteClient";
import { getCurrentUser } from "./authServices";

export const createInvoiceService = async (data: any, session: string) => {
  const { clientName, amount, vatRate = 0.15 } = data;
  const total = amount + amount * vatRate;

  const {databases } = await browserClient(session)

  const user = await getCurrentUser(session);

  const result = await databases.createDocument(
    process.env.DB_ID!,
    process.env.COLLECTION_INVOICES!,
    ID.unique(),
    {
      userId: user.userId,
      clientName,
      amount,
      vatRate,
      total,
      status: "Unpaid",
    }
  );

  return {
    clientName: result.clientName,
    amount: result.amount,
    vatRate: result.vatRate,
    total: result.total,
    status: result.status,
    id: result.$id,
    createdAt: result.$createdAt,
    updatedAt: result.$updatedAt,
    userId: result.$userId,
  };
};

export const getInvoicesService = async (session: string, page?: string, size?: string) => {
  const {databases } = await browserClient(session)

  const user = await getCurrentUser(session);

  const result = await databases.listDocuments(
    process.env.DB_ID!,
    process.env.COLLECTION_INVOICES!,
    [
      Query.equal('userId', [`${user.userId}`]),
      Query.limit(parseInt(size || '10')),
      Query.offset((parseInt(page || '1') - 1) * parseInt(size || '10')),
    ]
  );

  return {
    total: result.total,
    items: result.documents.map((item) => ({
      clientName: item.clientName,
      amount: item.amount,
      vatRate: item.vatRate,
      total: item.total,
      status: item.status,
      id: item.$id,
      createdAt: item.$createdAt,
      updatedAt: item.$updatedAt,
      userId: item.$userId,
    })),
    page: parseInt(page || '1'),
    size: parseInt(size || '10'),
  };
}

export const getInvoiceService = async (invoiceId: string, session: string) => {
  const { databases } = await  browserClient(session)

  const result = await databases.getDocument(
    process.env.DB_ID!,
    process.env.COLLECTION_INVOICES!,
    invoiceId
  );

  return result;
};

export const updateInvoiceService = async (data: any, session: string) => {
  const { id, ...updateData } = data;

  const { databases } = await browserClient(session);

  const result = await databases.updateDocument(
    process.env.DB_ID!,
    process.env.COLLECTION_INVOICES!,
    id,
    {
      clientName: updateData.clientName,
      amount: updateData.amount,
      vatRate: updateData.vatRate,
      total: updateData.total,
      status: "Unpaid",
    }
  );

  return {
    clientName: result.clientName,
    amount: result.amount,
    vatRate: result.vatRate,
    total: result.total,
    status: result.status,
    id: result.$id,
    createdAt: result.$createdAt,
    updatedAt: result.$updatedAt,
    userId: result.$userId,
  };
};

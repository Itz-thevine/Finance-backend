import { browserClient } from "../config/appWriteClient";

export const getVatRatesService = async (session: string) => {
    const {databases } = await browserClient(session)
  
    const result = await databases.listDocuments(
      process.env.DB_ID!,
      process.env.COLLECTION_VAT!,
    );
  
    return {
        total: result.total,
        items: result.documents.map((item) => ({
            id: item.vatId,
            "vatId": item.vatId,
            "vatCode": item.vatCode,
            "vatRate": item.vatRate,
        })),
    }
  }
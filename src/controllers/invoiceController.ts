import { Request, Response } from "express";
import { createInvoiceService } from "../services/invoiceServices";


export const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await createInvoiceService(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create invoice" });
  }
};

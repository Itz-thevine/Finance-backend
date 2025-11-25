import { Request, Response } from "express";
import { createInvoiceService, getInvoiceService, getInvoicesService, updateInvoiceService } from "../services/invoiceServices";


export const createInvoice = async (req: Request, res: Response) => {
  const session = req.headers['session'] as string;
  try {
    const invoice = await createInvoiceService(req.body, session);
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      const statusCode = (err as any).code || 500;
      res.status(statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  const session = req.headers['session'] as string;
  const page = req.query.page as string;
  const size = req.query.size as string;
  
  try {
    const invoices = await getInvoicesService(session, page, size);
    res.status(200).json(invoices);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      const statusCode = (err as any).code || 500;
      res.status(statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getInvoice= async (req: Request, res: Response) => {
  const session = req.headers['session'] as string;
  try {
    const invoice = await getInvoiceService(req.params.invoiceId, session);
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      const statusCode = (err as any).code || 500;
      res.status(statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateInvoice= async (req: Request, res: Response) => {
  const session = req.headers['session'] as string;
  try {
    const invoice = await updateInvoiceService(req.body, session);
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      const statusCode = (err as any).code || 500;
      res.status(statusCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

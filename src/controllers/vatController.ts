import { Request, Response } from "express";
import { getVatRatesService } from "../services/vatService";


export const getVatRates = async (req: Request, res: Response) => {
  const session = req.headers['session'] as string;
  
  try {
    const vatRates = await getVatRatesService(session);
    res.status(200).json(vatRates);
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
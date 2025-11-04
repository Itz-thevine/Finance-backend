import express from "express";
import { createInvoice } from "../controllers/invoiceController";


const router = express.Router();

router.post("/", createInvoice);

export default router;

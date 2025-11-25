import express from "express";
import { createInvoice, getInvoice, getInvoices, updateInvoice } from "../controllers/invoiceController";

const router = express.Router();

router.post("/", createInvoice);
router.get("/", (req: express.Request, res: express.Response) => {
    const page = Math.max(1, parseInt(String(req.query.page)) || 1);
    const size = Math.max(1, parseInt(String(req.query.size)) || 10);
    req.query.page = String(page);
    req.query.size = String(size);
    return getInvoices(req, res);
});
router.patch("/", updateInvoice);
router.get("/:invoiceId", getInvoice);

export default router;

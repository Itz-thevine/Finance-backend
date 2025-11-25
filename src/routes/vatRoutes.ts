import express from "express";
import { getVatRates } from "../controllers/vatController";

const router = express.Router();

router.get("/", getVatRates)

export default router;
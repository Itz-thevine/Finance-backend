import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import invoiceRoutes from "./routes/invoiceRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/invoices", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("Finance Management API is running 🚀");
});

export default app;

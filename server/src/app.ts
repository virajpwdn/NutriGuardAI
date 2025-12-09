import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieparser from "cookie-parser";
import aiRouter from "./routes/auth.routes";

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(cookieparser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/v1/ai", aiRouter)

export default app;

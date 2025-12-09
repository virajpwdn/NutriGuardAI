import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieparser from "cookie-parser";

const app = express();

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(cookieparser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/test", (req, res) => {
  console.log("HELLO WORLD");
  res.send("Hello");
});

export default app;

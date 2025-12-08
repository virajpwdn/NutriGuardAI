import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

app.get("/test", (req, res) => {
  console.log("HELLO WORLD");
});

export default app
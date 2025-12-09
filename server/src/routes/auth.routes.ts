import { Router } from "express";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { graph } from "../utils/graph/graph";
const aiRouter = Router();

aiRouter.post("/dietplan", async (req: Request, res: Response) => {
  const { data } = req.body;
  logger.info(data);
  const result = await graph.invoke({
    prompt: data,
    iteration: 0
  });
  res.json(result);
});

export default aiRouter;

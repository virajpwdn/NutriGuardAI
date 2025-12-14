import { Router } from "express";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { graph } from "../utils/graph/state-graph";
import cloudinary from "../utils/cloudinary/cloudinary";
import { upload } from "../utils/multer/multer.service";
import { ingredientGraph } from "../utils/graph/ingredient-graph";
import { io } from "../utils/socket/socket";
const aiRouter = Router();

aiRouter.post("/dietplan", async (req: Request, res: Response) => {
  const { data } = req.body;
  logger.info(data);
  const result = await graph.invoke({
    prompt: data,
    iteration: 0,
  });

  const finalResponse = result.missingFields
    ? result.feedback
    : result.finalPlan;

  // Emit to all connected clients via socket
  io.emit("dietplan-result", { finalResponse, originalData: data });

  res.json(finalResponse);
});

aiRouter.post(
  "/ingredient/check",
  upload.single("image"),
  async (req: any, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image found" });
      }

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "NutriGuard" },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file?.buffer);
      });

      const imgUrl = uploadResult.secure_url;
      console.log("ImgURL -> ", imgUrl);

      const result = await ingredientGraph.invoke({
        imgUrl: imgUrl,
      });

      console.log("RESULT -> ", result);

      res.status(200).json({ imgUrl });
    } catch (error) {
      // logger.error("Cloudinary Upload Error: ", error);
      res.status(500).json({ error: "upload failed" });
    }
  }
);

aiRouter.post("/kestra/callback", async (req, res) => {
  try {
    console.log("REQUEST -> ", req);
    const { result, executionId, timestamp } = req.body;
    console.log("Result before parse: ", result);
    const data = JSON.parse(result);

    res.json({
      success: true,
      message: "Analysis received",
      executionId,
    });
  } catch (error) {
    console.error("ERRORZ ", error);
    res.status(500).json({
      error: "Failed to parse data",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

aiRouter.post("/diet/kestra/callback", async (req: Request, res: Response) => {
  try {
    const result = req.body;
    io.emit("diet-plan", result)
    console.log("RESULT -> Dietplan ", result);
  } catch (error) {
    console.log("error", error);
  }
});

export default aiRouter;

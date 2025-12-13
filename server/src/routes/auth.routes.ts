import { Router } from "express";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { graph } from "../utils/graph/state-graph";
import cloudinary from "../utils/cloudinary/cloudinary";
import { upload } from "../utils/multer/multer.service";
import { ingredientGraph } from "../utils/graph/ingredient-graph";
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
  res.json(finalResponse);
});

aiRouter.post(
  "/ingredient/check",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image found" });
      }

      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "NutriGuard" },
          (error, result) => {
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
    const data = JSON.parse(result);
    console.log("data@@@@@@", data);
    res.json({
      success: true,
      message: "Analysis received",
      executionId,
    });
  } catch (error) {
    console.error("ERRORZ ", error)
  }
});

export default aiRouter;

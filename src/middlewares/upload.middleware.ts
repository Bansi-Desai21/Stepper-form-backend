import { Injectable, NestMiddleware, Req } from "@nestjs/common";
import { Response, NextFunction } from "express";
import * as multer from "multer";
import { memoryStorage } from "multer";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  use(@Req() req, res: Response, next: NextFunction) {
    const upload = multer({ storage: memoryStorage() }).fields([
      { name: "profilePic", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]);

    upload(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res
          .status(500)
          .json({ message: "File upload failed", error: err });
      }

      if (!req.files) {
        return next();
      }

      try {
        const uploadedFiles = {};

        if (req.files["profilePic"]) {
          const profilePicResult = await this.cloudinaryService.uploadFile(
            req.files["profilePic"][0]
          );
          uploadedFiles["profilePic"] = profilePicResult.secure_url;
        }

        if (req.files["resume"]) {
          const resumeResult = await this.cloudinaryService.uploadFile(
            req.files["resume"][0]
          );
          uploadedFiles["resume"] = resumeResult.secure_url;
        }

        req.body = { ...req.body, ...uploadedFiles };
        next();
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res
          .status(500)
          .json({ message: "Cloudinary upload failed", error });
      }
    });
  }
}

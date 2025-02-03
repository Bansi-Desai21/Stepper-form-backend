import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import * as path from 'path';

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const storage = diskStorage({
      destination: path.join(process.cwd(), 'uploads'),
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
      },
    });

    const upload = multer({ storage }).fields([
      { name: 'profilePic', maxCount: 1 },
      { name: 'resume', maxCount: 1 },
    ]);

    upload(req, res, (err) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ message: 'File upload failed', error: err });
      }
      next();
    });
  }
}

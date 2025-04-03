import { FILE_SIZE_LIMIT } from "@/constant/constant";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// No storage option is provided, so multer will use memory storage by default
export const upload = multer({
  limits: {
    fileSize: FILE_SIZE_LIMIT, // e.g., 10MB
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG & PNG are allowed!"));
    }
  },
});

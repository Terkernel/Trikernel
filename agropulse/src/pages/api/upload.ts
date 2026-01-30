import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Helper function to run multer middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Run multer middleware
    await runMiddleware(req, res, upload.array("images", 5)); // Allow up to 5 images

    const files = (req as any).files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedFiles = [];

    // Process each uploaded file
    for (const file of files) {
      // Generate unique filename
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
      const filePath = path.join(process.cwd(), "public", "uploads", fileName);

      // Ensure upload directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Process image with Sharp (resize, compress, convert to WebP)
      const processedImage = await sharp(file.buffer)
        .resize(1200, 1200, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toBuffer();

      // Save processed image
      await fs.writeFile(filePath.replace(path.extname(fileName), ".webp"), processedImage);

      // Also save original if needed for certain use cases
      await fs.writeFile(filePath, file.buffer);

      uploadedFiles.push({
        originalName: file.originalname,
        fileName: fileName.replace(path.extname(fileName), ".webp"),
        size: processedImage.length,
        url: `/uploads/${fileName.replace(path.extname(fileName), ".webp")}`,
      });
    }

    res.status(200).json({
      success: true,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Upload failed",
    });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser for multer
  },
};
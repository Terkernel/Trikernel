import QRCode from "qrcode";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { listingId, size = "256" } = req.query;

  if (!listingId || typeof listingId !== "string") {
    return res.status(400).json({ error: "Listing ID is required" });
  }

  try {
    // Generate URL for the listing
    const listingUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/listings/${listingId}`;

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(listingUrl, {
      width: parseInt(size as string),
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    // Set cache headers for performance
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.setHeader("Content-Type", "image/png");

    // Convert data URL to buffer and send
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    res.status(200).send(buffer);
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
}
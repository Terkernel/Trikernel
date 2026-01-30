import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { transactionType, data, userId } = req.body;

  if (!transactionType || !data || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Get the last block hash for chain integrity
    const lastBlock = await db.blockchainTransaction.findFirst({
      orderBy: { createdAt: "desc" },
    });

    // Create transaction data hash
    const transactionData = JSON.stringify({
      transactionType,
      data,
      userId,
      timestamp: new Date().toISOString(),
    });

    const dataHash = crypto.createHash("sha256").update(transactionData).digest("hex");

    // Create block hash (includes previous block hash for chain)
    const blockData = lastBlock
      ? `${lastBlock.blockHash}${dataHash}${Date.now()}`
      : `${dataHash}${Date.now()}`;

    const blockHash = crypto.createHash("sha256").update(blockData).digest("hex");

    // Store transaction in blockchain
    const transaction = await db.blockchainTransaction.create({
      data: {
        transactionType,
        data,
        userId,
        dataHash,
        blockHash,
        previousBlockHash: lastBlock?.blockHash || null,
        nonce: Math.floor(Math.random() * 1000000), // Simple nonce
      },
    });

    // Generate transaction certificate
    const certificate = {
      transactionId: transaction.id,
      blockHash: transaction.blockHash,
      timestamp: transaction.createdAt,
      verificationUrl: `${process.env.NEXTAUTH_URL}/api/blockchain/verify/${transaction.id}`,
    };

    res.status(200).json({
      success: true,
      transaction,
      certificate,
    });
  } catch (error) {
    console.error("Blockchain transaction error:", error);
    res.status(500).json({ error: "Failed to create blockchain transaction" });
  }
}
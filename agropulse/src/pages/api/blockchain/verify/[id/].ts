import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Transaction ID is required" });
  }

  try {
    const transaction = await db.blockchainTransaction.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Verify transaction integrity
    const transactionData = JSON.stringify({
      transactionType: transaction.transactionType,
      data: transaction.data,
      userId: transaction.userId,
      timestamp: transaction.createdAt.toISOString(),
    });

    const calculatedDataHash = crypto.createHash("sha256").update(transactionData).digest("hex");
    const isDataValid = calculatedDataHash === transaction.dataHash;

    // Verify block chain integrity
    let isChainValid = true;
    if (transaction.previousBlockHash) {
      const previousTransaction = await db.blockchainTransaction.findFirst({
        where: { blockHash: transaction.previousBlockHash },
      });

      if (!previousTransaction) {
        isChainValid = false;
      }
    }

    // Verify current block hash
    const blockData = transaction.previousBlockHash
      ? `${transaction.previousBlockHash}${transaction.dataHash}${transaction.createdAt.getTime()}`
      : `${transaction.dataHash}${transaction.createdAt.getTime()}`;

    const calculatedBlockHash = crypto.createHash("sha256").update(blockData).digest("hex");
    const isBlockValid = calculatedBlockHash === transaction.blockHash;

    const verification = {
      transactionId: transaction.id,
      isValid: isDataValid && isBlockValid && isChainValid,
      dataIntegrity: isDataValid,
      blockIntegrity: isBlockValid,
      chainIntegrity: isChainValid,
      transaction: {
        type: transaction.transactionType,
        user: transaction.user.name,
        timestamp: transaction.createdAt,
        data: transaction.data,
      },
    };

    res.status(200).json(verification);
  } catch (error) {
    console.error("Transaction verification error:", error);
    res.status(500).json({ error: "Failed to verify transaction" });
  }
}
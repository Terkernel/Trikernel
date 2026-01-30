import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cropName, location, quantity, quality } = req.body;

  if (!cropName || !location) {
    return res.status(400).json({ error: "Crop name and location are required" });
  }

  try {
    // Get historical price data for the crop
    const historicalPrices = await db.mandiPrice.findMany({
      where: {
        cropName: {
          contains: cropName,
          mode: "insensitive",
        },
      },
      orderBy: {
        priceDate: "desc",
      },
      take: 100, // Last 100 price records
    });

    // Get current market trends
    const currentPrices = await db.mandiPrice.findMany({
      where: {
        cropName: {
          contains: cropName,
          mode: "insensitive",
        },
        priceDate: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    });

    // Get similar listings
    const similarListings = await db.cropListing.findMany({
      where: {
        cropName: {
          contains: cropName,
          mode: "insensitive",
        },
        status: "ACTIVE",
      },
      include: {
        farmer: {
          select: {
            city: true,
            state: true,
            avgRating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
    });

    // Simple AI prediction algorithm (can be enhanced with ML models)
    const prediction = calculatePricePrediction(
      historicalPrices,
      currentPrices,
      similarListings,
      { cropName, location, quantity, quality }
    );

    res.status(200).json({
      success: true,
      prediction,
      confidence: calculateConfidence(historicalPrices, currentPrices),
      marketInsights: generateMarketInsights(currentPrices, similarListings),
    });
  } catch (error) {
    console.error("Price prediction error:", error);
    res.status(500).json({ error: "Failed to generate price prediction" });
  }
}

function calculatePricePrediction(
  historicalPrices: any[],
  currentPrices: any[],
  similarListings: any[],
  input: any
) {
  // Calculate average historical price
  const avgHistoricalPrice = historicalPrices.length > 0
    ? historicalPrices.reduce((sum, price) => sum + price.modalPrice, 0) / historicalPrices.length
    : 0;

  // Calculate current market average
  const avgCurrentPrice = currentPrices.length > 0
    ? currentPrices.reduce((sum, price) => sum + price.modalPrice, 0) / currentPrices.length
    : avgHistoricalPrice;

  // Calculate average listing price
  const avgListingPrice = similarListings.length > 0
    ? similarListings.reduce((sum, listing) => sum + listing.expectedPrice, 0) / similarListings.length
    : avgCurrentPrice;

  // Apply quality multiplier
  const qualityMultiplier = input.quality === "premium" ? 1.2 :
                           input.quality === "standard" ? 1.0 : 0.8;

  // Apply quantity discount (bulk discount)
  const quantityDiscount = input.quantity > 1000 ? 0.95 :
                          input.quantity > 500 ? 0.97 : 1.0;

  // Calculate predicted price
  const basePrice = (avgCurrentPrice + avgListingPrice) / 2 || avgHistoricalPrice;
  const predictedPrice = basePrice * qualityMultiplier * quantityDiscount;

  // Calculate price range
  const volatility = calculateVolatility(historicalPrices);
  const minPrice = predictedPrice * (1 - volatility);
  const maxPrice = predictedPrice * (1 + volatility);

  return {
    predictedPrice: Math.round(predictedPrice * 100) / 100,
    minPrice: Math.round(minPrice * 100) / 100,
    maxPrice: Math.round(maxPrice * 100) / 100,
    bestTimeToSell: determineBestTimeToSell(currentPrices),
    priceTrend: determinePriceTrend(historicalPrices),
  };
}

function calculateVolatility(prices: any[]) {
  if (prices.length < 2) return 0.1; // Default 10% volatility

  const priceChanges = [];
  for (let i = 1; i < prices.length; i++) {
    const change = Math.abs(prices[i].modalPrice - prices[i-1].modalPrice) / prices[i-1].modalPrice;
    priceChanges.push(change);
  }

  const avgVolatility = priceChanges.reduce((sum, change) => sum + change, 0) / priceChanges.length;
  return Math.min(avgVolatility, 0.5); // Cap at 50%
}

function calculateConfidence(historicalPrices: any[], currentPrices: any[]) {
  const historicalCount = historicalPrices.length;
  const currentCount = currentPrices.length;

  // Higher confidence with more data points
  const dataConfidence = Math.min((historicalCount + currentCount) / 50, 1);

  // Higher confidence for recent data
  const recencyConfidence = currentCount > 10 ? 0.9 : 0.7;

  return Math.round((dataConfidence * recencyConfidence) * 100);
}

function determineBestTimeToSell(currentPrices: any[]) {
  if (currentPrices.length < 7) return "Now";

  // Simple trend analysis - sell when prices are high
  const recentPrices = currentPrices.slice(0, 7);
  const avgRecent = recentPrices.reduce((sum, price) => sum + price.modalPrice, 0) / recentPrices.length;

  const olderPrices = currentPrices.slice(7, 14);
  const avgOlder = olderPrices.length > 0
    ? olderPrices.reduce((sum, price) => sum + price.modalPrice, 0) / olderPrices.length
    : avgRecent;

  return avgRecent > avgOlder ? "Now" : "Wait 1-2 weeks";
}

function determinePriceTrend(historicalPrices: any[]) {
  if (historicalPrices.length < 14) return "stable";

  const recent = historicalPrices.slice(0, 7);
  const older = historicalPrices.slice(7, 14);

  const avgRecent = recent.reduce((sum, price) => sum + price.modalPrice, 0) / recent.length;
  const avgOlder = older.reduce((sum, price) => sum + price.modalPrice, 0) / older.length;

  const change = (avgRecent - avgOlder) / avgOlder;

  if (change > 0.05) return "increasing";
  if (change < -0.05) return "decreasing";
  return "stable";
}

function generateMarketInsights(currentPrices: any[], similarListings: any[]) {
  const insights = [];

  // Price range insight
  if (currentPrices.length > 0) {
    const prices = currentPrices.map(p => p.modalPrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    insights.push(`Market price range: ₹${min} - ₹${max} per unit`);
  }

  // Competition insight
  if (similarListings.length > 0) {
    insights.push(`${similarListings.length} similar listings active in the market`);
  }

  // Location-based insight
  const locations = [...new Set(currentPrices.map(p => p.state))];
  if (locations.length > 0) {
    insights.push(`Available in ${locations.length} states: ${locations.slice(0, 3).join(", ")}`);
  }

  return insights;
}
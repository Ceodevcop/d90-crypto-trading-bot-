export class RiskManager {
  static calculateLotSize(
    accountBalance: number,
    riskPerTrade: number, // Percentage (e.g., 1 for 1%)
    stopLossPct: number,  // Percentage (e.g., 2 for 2%)
    currentPrice: number
  ): number {
    const riskAmount = accountBalance * (riskPerTrade / 100);
    const priceDifference = currentPrice * (stopLossPct / 100);
    const lotSize = riskAmount / priceDifference;
    return parseFloat(lotSize.toFixed(8));
  }

  static validateGridSpacing(
    upperPrice: number,
    lowerPrice: number,
    gridCount: number,
    volatilityPct: number
  ): boolean {
    const gridSpacing = (upperPrice - lowerPrice) / gridCount;
    const minSpacing = (upperPrice + lowerPrice) / 2 * (volatilityPct / 100);
    return gridSpacing >= minSpacing;
  }
}

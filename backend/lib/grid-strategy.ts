interface GridLevel {
  price: number;
  buy: boolean;
  quantity: number;
}

export class GridTrading {
  private grids: GridLevel[] = [];
  private currentPrice: number = 0;

  constructor(
    private upperPrice: number,
    private lowerPrice: number,
    private gridCount: number,
    private investment: number
  ) {
    this.initializeGrids();
  }

  private initializeGrids() {
    const priceStep = (this.upperPrice - this.lowerPrice) / this.gridCount;
    const lotSize = this.investment / this.gridCount;
    
    for (let i = 0; i <= this.gridCount; i++) {
      const levelPrice = this.lowerPrice + (i * priceStep);
      this.grids.push({
        price: parseFloat(levelPrice.toFixed(8)),
        buy: i % 2 === 0, // Alternate buy/sell
        quantity: parseFloat((lotSize / levelPrice).toFixed(8))
      });
    }
  }

  public updatePrice(currentPrice: number): TradeSignal | null {
    this.currentPrice = currentPrice;
    const activeLevel = this.grids.find(level => 
      Math.abs(level.price - currentPrice) < (level.price * 0.001) // 0.1% threshold
    );

    if (activeLevel) {
      return {
        price: activeLevel.price,
        type: activeLevel.buy ? 'BUY' : 'SELL',
        quantity: activeLevel.quantity,
        timestamp: new Date()
      };
    }
    return null;
  }
}

export class ProfitCalculator {
  private tradeHistory: Trade[] = [];

  addTrade(trade: Trade) {
    this.tradeHistory.push(trade);
  }

  getTradeProfit(tradeId: string): number {
    const trade = this.tradeHistory.find(t => t.id === tradeId);
    if (!trade) return 0;
    
    if (trade.type === 'BUY') {
      const correspondingSell = this.tradeHistory.find(
        t => t.type === 'SELL' && t.price > trade.price
      );
      return correspondingSell 
        ? (correspondingSell.price - trade.price) * trade.quantity
        : 0;
    } else {
      const correspondingBuy = this.tradeHistory.find(
        t => t.type === 'BUY' && t.price < trade.price
      );
      return correspondingBuy
        ? (trade.price - correspondingBuy.price) * trade.quantity
        : 0;
    }
  }

  getTotalProfit(): number {
    return this.tradeHistory.reduce((total, trade) => {
      return total + this.getTradeProfit(trade.id);
    }, 0);
  }
}

interface Trade {
  id: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  timestamp: Date;
  pair: string;
}

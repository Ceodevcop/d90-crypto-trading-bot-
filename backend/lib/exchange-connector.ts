import Binance from 'binance-api-node';
import { GridLevel } from './grid-strategy';

export class ExchangeConnector {
  private client: any;
  
  constructor(apiKey: string, apiSecret: string) {
    this.client = Binance({
      apiKey,
      apiSecret
    });
  }

  public async executeTrade(
    pair: string,
    level: GridLevel,
    quantity: number
  ): Promise<TradeExecution> {
    try {
      const order = await this.client.order({
        symbol: pair,
        side: level.buy ? 'BUY' : 'SELL',
        type: 'LIMIT',
        quantity: quantity.toFixed(8),
        price: level.price.toFixed(8),
        timeInForce: 'GTC'
      });

      return {
        success: true,
        orderId: order.orderId,
        executedQty: parseFloat(order.executedQty),
        price: parseFloat(order.price),
        timestamp: new Date(order.transactTime)
      };
    } catch (error) {
      console.error(`Trade execution failed:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  public async getCurrentPrice(pair: string): Promise<number> {
    const ticker = await this.client.prices({ symbol: pair });
    return parseFloat(ticker[pair]);
  }
}

interface TradeExecution {
  success: boolean;
  orderId?: number;
  executedQty?: number;
  price?: number;
  timestamp?: Date;
  error?: string;
}

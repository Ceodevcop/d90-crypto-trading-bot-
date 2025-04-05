import { BINANCE_CONFIG } from '../config/env';

export const getExchangeCredentials = () => ({
  apiKey: process.env.BINANCE_API_KEY || BINANCE_CONFIG.API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET || BINANCE_CONFIG.API_SECRET
});

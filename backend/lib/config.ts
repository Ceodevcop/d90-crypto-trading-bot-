interface BotConfig {
  EXCHANGE_API_KEY: string;
  EXCHANGE_API_SECRET: string;
  GRID_SPACING_PCT: number;
  MAX_CONCURRENT_TRADES: number;
}

export const getConfig = (): BotConfig => ({
  EXCHANGE_API_KEY: process.env.EXCHANGE_API_KEY || '',
  EXCHANGE_API_SECRET: process.env.EXCHANGE_API_SECRET || '',
  GRID_SPACING_PCT: parseFloat(process.env.GRID_SPACING_PCT || '0.5'), // 0.5% spacing
  MAX_CONCURRENT_TRADES: parseInt(process.env.MAX_CONCURRENT_TRADES || '5')
});

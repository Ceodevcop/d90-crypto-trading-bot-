import { VercelRequest, VercelResponse } from '@vercel/node';
import { GridTrading } from '../lib/grid-strategy';
import { connectDB } from '../lib/database';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { upperPrice, lowerPrice, gridCount, investment, pair } = req.body;
    
    // Initialize grid strategy
    const gridBot = new GridTrading(
      parseFloat(upperPrice),
      parseFloat(lowerPrice),
      parseInt(gridCount),
      parseFloat(investment)
    );

    // Save to database
    const db = await connectDB();
    await db.collection('active_bots').insertOne({
      pair,
      strategy: 'GRID',
      config: { upperPrice, lowerPrice, gridCount, investment },
      startedAt: new Date(),
      isActive: true
    });

    res.status(200).json({ 
      success: true,
      message: `Bot started for ${pair} with ${gridCount} grid levels`
    });
  } catch (error) {
    console.error('Error starting bot:', error);
    res.status(500).json({ error: 'Failed to start bot' });
  }
};

import { useState, useEffect } from 'react';
import { StartStopButton } from './BotControls/StartStopButton';
import { GridLevels } from './GridConfig/GridLevels';
import { TradeList } from './TradeHistory/TradeList';
import { ProfitDisplay } from './TradeHistory/ProfitDisplay';
import { fetchBotStatus, fetchTradeHistory } from '../utils/api';

export const Dashboard = ({ botId }: { botId: string }) => {
  const [status, setStatus] = useState<any>(null);
  const [trades, setTrades] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [botStatus, history] = await Promise.all([
          fetchBotStatus(botId),
          fetchTradeHistory(botId)
        ]);
        setStatus(botStatus);
        setTrades(history);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30s
    
    return () => clearInterval(interval);
  }, [botId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Bot Controls</h2>
            <StartStopButton botId={botId} />
            {status && (
              <div className="mt-4">
                <p>Status: {status.isActive ? 'Running' : 'Stopped'}</p>
                <p>Pair: {status.pair}</p>
                <p>Grid Levels: {status.config.gridCount}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="col-span-1">
          <GridLevels 
            initialConfig={status?.config || {}}
            botId={botId}
          />
        </div>
        
        <div className="col-span-1">
          <ProfitDisplay trades={trades} />
          <TradeList trades={trades} />
        </div>
      </div>
    </div>
  );
};

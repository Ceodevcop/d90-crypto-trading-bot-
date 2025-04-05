import { useState } from 'react';
import { startBot, stopBot } from '../../utils/api';

export const StartStopButton = ({ botId }: { botId: string }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      if (isRunning) {
        await stopBot(botId);
      } else {
        await startBot(botId);
      }
      setIsRunning(!isRunning);
    } catch (error) {
      console.error('Error toggling bot:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`px-6 py-3 rounded-lg font-bold ${
        isRunning 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-green-500 hover:bg-green-600'
      } text-white transition-colors`}
    >
      {isLoading ? (
        <span>Processing...</span>
      ) : isRunning ? (
        <span>🛑 Stop Bot</span>
      ) : (
        <span>⭐ Start Bot</span>
      )}
    </button>
  );
};

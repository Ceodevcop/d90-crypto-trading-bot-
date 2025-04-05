const API_BASE = '/api';

export const startBot = async (botId: string, config: any) => {
  const response = await fetch(`${API_BASE}/start-bot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...config, botId })
  });
  return await response.json();
};

export const stopBot = async (botId: string) => {
  const response = await fetch(`${API_BASE}/stop-bot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ botId })
  });
  return await response.json();
};

export const fetchBotStatus = async (botId: string) => {
  const response = await fetch(`${API_BASE}/bot-status?id=${botId}`);
  return await response.json();
};

export const fetchTradeHistory = async (botId: string) => {
  const response = await fetch(`${API_BASE}/trade-history?id=${botId}`);
  return await response.json();
};

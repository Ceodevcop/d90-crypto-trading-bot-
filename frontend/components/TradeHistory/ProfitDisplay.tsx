export const ProfitDisplay = ({ trades }: { trades: any[] }) => {
  const totalProfit = trades.reduce((sum, trade) => sum + (trade.profit || 0), 0);
  const profitableTrades = trades.filter(t => t.profit > 0).length;
  const lossTrades = trades.filter(t => t.profit < 0).length;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">Performance Summary</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-2">
          <div className="text-2xl font-bold ${
            totalProfit >= 0 ? 'text-green-600' : 'text-red-600'
          }">
            ${totalProfit.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500">Total Profit</div>
        </div>
        <div className="p-2">
          <div className="text-2xl font-bold text-green-600">
            {profitableTrades}
          </div>
          <div className="text-sm text-gray-500">Winning Trades</div>
        </div>
        <div className="p-2">
          <div className="text-2xl font-bold text-red-600">
            {lossTrades}
          </div>
          <div className="text-sm text-gray-500">Losing Trades</div>
        </div>
      </div>
    </div>
  );
};

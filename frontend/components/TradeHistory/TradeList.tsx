import { format } from 'date-fns';

export const TradeList = ({ trades }: { trades: any[] }) => (
  <div className="bg-white p-4 rounded-lg shadow mt-4">
    <h3 className="font-bold text-lg mb-3">Trade History</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Profit</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {format(new Date(trade.timestamp), 'MMM dd HH:mm:ss')}
              </td>
              <td className={`px-4 py-2 font-medium ${
                trade.type === 'BUY' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trade.type}
              </td>
              <td className="px-4 py-2">{trade.price.toFixed(8)}</td>
              <td className="px-4 py-2">{trade.quantity.toFixed(4)}</td>
              <td className={`px-4 py-2 ${
                trade.profit >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {trade.profit?.toFixed(4) || '--'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

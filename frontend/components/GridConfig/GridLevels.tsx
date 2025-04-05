import { useState, useEffect } from 'react';
import { updateGridConfig } from '../../utils/api';

export const GridLevels = ({ initialConfig, botId }: { 
  initialConfig: any, 
  botId: string 
}) => {
  const [config, setConfig] = useState({
    upperPrice: initialConfig.upperPrice || 0,
    lowerPrice: initialConfig.lowerPrice || 0,
    gridCount: initialConfig.gridCount || 10,
    investment: initialConfig.investment || 1000
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({
      ...config,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateGridConfig(botId, config);
      alert('Configuration saved successfully!');
    } catch (error) {
      alert('Failed to save configuration');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Grid Configuration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Upper Price
          </label>
          <input
            type="number"
            name="upperPrice"
            value={config.upperPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.00000001"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Lower Price
          </label>
          <input
            type="number"
            name="lowerPrice"
            value={config.lowerPrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.00000001"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Grids
          </label>
          <input
            type="number"
            name="gridCount"
            value={config.gridCount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="3"
            max="100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Total Investment (USD)
          </label>
          <input
            type="number"
            name="investment"
            value={config.investment}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="10"
          />
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
};

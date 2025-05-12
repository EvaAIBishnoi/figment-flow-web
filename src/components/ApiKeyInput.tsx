
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  label?: string;
  placeholder?: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  onApiKeySet,
  label = 'Mistral API Key',
  placeholder = 'Enter your Mistral API key'
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isKeySet, setIsKeySet] = useState<boolean>(false);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      setIsKeySet(true);
      // Store in localStorage for persistence
      localStorage.setItem('mistral-api-key', apiKey.trim());
    }
  };

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  const resetApiKey = () => {
    setApiKey('');
    setIsKeySet(false);
    localStorage.removeItem('mistral-api-key');
  };

  return (
    <div className="border p-4 rounded-md mb-6 bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-2">{label}</h3>
      {!isKeySet ? (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={placeholder}
              className="pr-10"
            />
            <button 
              type="button" 
              onClick={toggleShowKey}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <Button 
            onClick={handleSaveApiKey}
            disabled={!apiKey.trim()}
            className="bg-[#0a2e81] hover:bg-[#071d52]"
          >
            Save Key
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-sm">API key is set and ready to use</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetApiKey}
          >
            Reset Key
          </Button>
        </div>
      )}
      <p className="mt-2 text-xs text-gray-500">
        Your API key is stored locally and never sent to our servers.
      </p>
    </div>
  );
};

export default ApiKeyInput;

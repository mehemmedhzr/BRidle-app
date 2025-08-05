import { useState, type ChangeEvent } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  chosenLanguage: string;
  wordLanguages: string[];
  onLanguageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Settings({ chosenLanguage, wordLanguages, onLanguageChange }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        title="Settings"
      >
        <SettingsIcon size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  onChange={onLanguageChange}
                  value={chosenLanguage}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                >
                  {wordLanguages.map((item, index) => (
                    <option key={item + index} value={item}>
                      {item.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Game Options</h3>
                <div className="text-sm text-gray-500">
                  <p>Difficulty settings coming soon...</p>
                  <p>Character count options coming soon...</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
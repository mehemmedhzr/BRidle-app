import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  onNewGame: () => void;
}

export default function Header({ onNewGame }: HeaderProps) {
  return (
    <>
      <div className="flex justify-center mb-4">
        <h1 className="text-2xl font-bold">BRiddle</h1>
      </div>
      
      <button
        onClick={onNewGame}
        className="fixed top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
        title="New Game"
      >
        <RotateCcw size={20} />
      </button>
    </>
  );
} 
import React from 'react';

interface GameOverModalProps {
  isOpen: boolean;
  isWon: boolean;
  onNewGame: () => void;
  onClose: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, isWon, onNewGame, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">
            {isWon ? '🎉 Congratulations! 🎉' : '😔 Game Over 😔'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            {isWon ? 'You guessed the word correctly!' : 'You ran out of attempts. Better luck next time!'}
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onNewGame}
            className="flex-1 px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;

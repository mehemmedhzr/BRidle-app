interface GameBoardProps {
  letterRepresentation: string[][];
  guesses: string[];
  currentGuess: string;
  shake: boolean;
  chosenLanguage: string;
  wordLength: number;
}

export default function GameBoard({ letterRepresentation, guesses, currentGuess, shake, chosenLanguage, wordLength }: GameBoardProps) {
  const MAX_ATTEMPTS = 6;

  const getTileStatus = (index: number, pIndex: number) => {
    if (guesses.length > 0 && pIndex < guesses.length) {
      if (letterRepresentation[pIndex][index] === 'correct') {
        return 'bg-[#6AAA64] text-white';
      } else if (letterRepresentation[pIndex][index] === 'misplaced') {
          return 'bg-[#C9B458] text-white';
      } else {
        return 'bg-[#787C7E] text-white';
      }
    }
    return '';
  };

  return (
    <div className="flex flex-col gap-2">
      {[...Array(MAX_ATTEMPTS)].map((_, index) => {
        const guess = guesses[index] || (index === guesses.length ? currentGuess : '');
        const parentIndex = index;

        return (
          <div key={index} className={`flex gap-2 justify-center ${shake ? 'shake' : ''}`}>
            {[...Array(wordLength)].map((_, index) => (
              <div 
                key={index} 
                className={`w-10 h-10 flex items-center justify-center font-bold text-black border border-[#D3D6DA] ${getTileStatus(index, parentIndex)}`}
              >
                {guess[index]?.toLocaleUpperCase(chosenLanguage)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
} 
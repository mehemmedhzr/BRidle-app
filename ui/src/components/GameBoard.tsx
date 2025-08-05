interface GameBoardProps {
  solution: string;
  guesses: string[];
  currentGuess: string;
  shake: boolean;
  chosenLanguage: string;
}

export default function GameBoard({ solution, guesses, currentGuess, shake, chosenLanguage }: GameBoardProps) {
  const MAX_ATTEMPTS = 6;

  const getTileStatus = (index: number, pIndex: number) => {
    if (guesses.length > 0 && pIndex < guesses.length) {
      if (guesses[pIndex][index] === solution[index]) {
        return 'bg-[#6AAA64] text-white';
      } else if (solution.includes(guesses[pIndex][index])) {
        const guessArray = guesses[pIndex].split('');

        const solutionLngth = solution
          .split('')
          .filter((char, i) => char !== guessArray[i] && guessArray.includes(char))
          .length;

        const guessIndexes = guessArray
          .map((char, i) => char !== solution[i] && solution.includes(char) ? i : null)
          .filter(index => index !== null);

        if (guessIndexes.indexOf(index) < solutionLngth) {
          return 'bg-[#C9B458] text-white';
        }

        return 'bg-[#787C7E] text-white';
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
            {[...Array(solution.length)].map((_, index) => (
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
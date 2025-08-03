import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { Delete } from 'lucide-react';
import { Toaster, toast } from 'sonner';

const MAX_ATTEMPTS = 6;

const KEYBOARD_LETTERS = {
  KEYBOARD_LETTERS_ROW_1: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  KEYBOARD_LETTERS_ROW_2: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  KEYBOARD_LETTERS_ROW_3: ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
};

function App() {

  const [solution, setSolution] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [wrongLetter, setWrongLetter] = useState<string[]>([]);
  // const [flip, setFlip] = useState<number[]>([]);

  const processInput = useCallback((inputKey: string) => {
    console.log(1212);
    console.log(inputKey);
    console.log(solution);
    if (gameOver) return;
  
    if (inputKey.length === 1 && /^[a-z]$/i.test(inputKey)) {
      if (currentGuess.length < solution.length) {
        setCurrentGuess(prev => prev + inputKey.toLowerCase());
      }
      return;
    }
  
    if (inputKey === 'Enter') {

      if (currentGuess.length === solution.length) {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');
  
        if (newGuesses.includes(solution) || newGuesses.length === MAX_ATTEMPTS) {
          if (newGuesses.includes(solution)) {
            toast.success('You won!');
          } else {
            toast.error('You lost!');
          }

          setGameOver(true);
          return;
        }
        return;
      }
      setShake(true);
      
      setTimeout(() => {
        setShake(false);
      }, 400);
      toast.warning('Not enough letters');
      return;
    }
  
    if (inputKey === 'Backspace') {
      if (currentGuess.length > 0) {
        setCurrentGuess(prev => prev.slice(0, -1));
      }
    }
  }, [gameOver, currentGuess, solution, guesses]);
  
  const handleKeyUp  = useCallback((event: KeyboardEvent) => processInput(event.key), [processInput]);
  
  const handleButtonClick = useCallback((key: string) => processInput(key), [processInput]);
  
  useEffect(() => {
    const fetchSolution = async () => {
      const response = await fetch('http://localhost:3001/api/words/random/word');
      const data = await response.json();
      console.log(data);
      setSolution(data.data.word);
    }
    fetchSolution();
  }, []);
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp])

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
  }

  useEffect(() => {
    if (guesses.length > 0) {
      const lastGuess = guesses[guesses.length - 1];
      const wrongLetters: string[] = [];
      
      lastGuess.split('').forEach((letter, index) => {
        if (letter !== solution[index] && !solution.includes(letter)) {
          wrongLetters.push(letter.toUpperCase());
        }
      });
      
      if (wrongLetters.length > 0) {
        setWrongLetter(prev => [...new Set([...prev, ...wrongLetters])]);
      }
    }
  }, [guesses, solution]);

  // useEffect(() => {
  //   if (guesses.length > 0) {
  //     const lastGuessIndex = guesses.length - 1;
  //     const tileIndexes = Array.from({ length: solution.length }, (_, i) => i);
  
  //     const timeouts: ReturnType<typeof setTimeout>[] = [];
  
  //     tileIndexes.forEach((index, i) => {
  //       const flipTimeout = setTimeout(() => {
  //         setFlip([lastGuessIndex, index]);
  //       }, 600 * i);
  //       timeouts.push(flipTimeout);
  
  //       const resetTimeout = setTimeout(() => {
  //         setFlip([]);
  //       }, 600 * (i + 1));
  //       timeouts.push(resetTimeout);
  //     });
  
  //     return () => {
  //       timeouts.forEach(clearTimeout);
  //     };
  //   }
  // }, [guesses, solution.length]);

  return (
    <>
      <div className="bg-white">
        <div className="max-w-md md:max-w-lg mx-auto">
          <div className="flex justify-center mb-4">
            <h1 className="text-2xl font-bold">BRiddle</h1>
          </div>

          <div className="flex flex-col gap-2">
            {
              [...Array(MAX_ATTEMPTS)].map((_, index) => {
                const guess = guesses[index] || (index === guesses.length ? currentGuess : '');
                const parentIndex = index;

                return (
                  <div key={index} className={`flex gap-2 justify-center ${shake ? 'shake' : ''}`}>
                    {
                      [...Array(solution.length)].map((_, index) => {

                        return (
                          <div key={index} className={`w-10 h-10 flex items-center justify-center uppercase font-bold text-black border border-[#D3D6DA]  ${getTileStatus(index, parentIndex)}`}>
                            {guess[index]}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>

          <div className="flex justify-center gap-2 flex-col mt-4">
            <div className="flex justify-center gap-1.5 md:gap-2 flex-wrap">
              {
                KEYBOARD_LETTERS.KEYBOARD_LETTERS_ROW_1.map((letter) => {
                  return (
                    <button onClick={() => handleButtonClick(letter)} key={letter} className={`${wrongLetter.includes(letter) ? 'line-through opacity-50' : ''} w-7.5 md:w-10 h-11 md:h-14 text-sm md:text-md flex items-center justify-center bg-gray-200 text-black border border-[#D3D6DA]`}>
                      {letter}
                    </button>
                  )
                })
              }
            </div>

            <div className="flex justify-center gap-1.5 md:gap-2 flex-wrap">
              {
                KEYBOARD_LETTERS.KEYBOARD_LETTERS_ROW_2.map((letter) => {
                  return (
                    <button onClick={() => handleButtonClick(letter)} key={letter} className={`${wrongLetter.includes(letter) ? 'line-through opacity-50' : ''} w-7.5 md:w-10 h-11 md:h-14 text-sm md:text-md flex items-center justify-center bg-gray-200 text-black border border-[#D3D6DA]`}>
                      {letter}
                    </button>
                  )
                })
              }
            </div>

            <div className="flex justify-center gap-1.5 md:gap-2 flex-wrap">
              <button onClick={() => handleButtonClick('Enter')} className="w-12 md:w-16 h-11 md:h-14 text-sm md:text-md flex items-center justify-center text-black border bg-gray-200 border-[#D3D6DA]">
                Enter
              </button>
              {
                KEYBOARD_LETTERS.KEYBOARD_LETTERS_ROW_3.map((letter) => {
                  return (
                    <button onClick={() => handleButtonClick(letter)} key={letter} className={`${wrongLetter.includes(letter) ? 'line-through opacity-50' : ''} w-7.5 md:w-10 h-11 md:h-14 text-sm md:text-md flex items-center justify-center bg-gray-200 text-black border border-[#D3D6DA]`}>
                      {letter}
                    </button>
                  )
                })
              }
              <button onClick={() => handleButtonClick('Backspace')} className="w-12 md:w-16 h-11 md:h-14 text-sm md:text-md flex items-center justify-center text-black border bg-gray-200 border-[#D3D6DA]">
                <Delete size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-center" richColors />
    </>
  )
}

export default App;
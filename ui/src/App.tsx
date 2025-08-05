import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import './App.css'
import { Toaster, toast } from 'sonner';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Settings from './components/Settings';

const MAX_ATTEMPTS = 6;
const regex = /^[A-Za-zÇçƏəĞğİıÖöŞşÜüXx]+$/

interface KeyboardLetters {
  KEYBOARD_LETTERS_ROW_1?: string[];
  KEYBOARD_LETTERS_ROW_2?: string[];
  KEYBOARD_LETTERS_ROW_3?: string[];
}

function App() {

  const [solution, setSolution] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [wrongLetter, setWrongLetter] = useState<string[]>([]);
  // const [flip, setFlip] = useState<number[]>([]);
  const [wordLanguages, setWordLanguages] = useState<string[]>([]);
  const [chosenLanguage, setChosenLanguage] = useState<string>('az');
  const [keyboardLetters, setKeyboardLetters] = useState<KeyboardLetters>({});

  const processInput = useCallback((inputKey: string) => {
    if (gameOver) return;
  
    if (inputKey.length === 1 && regex.test(inputKey)) {
      if (currentGuess.length < solution.length) {
        setCurrentGuess(prev => prev + inputKey.toLocaleLowerCase(chosenLanguage));
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
  }, [gameOver, currentGuess, solution, guesses, chosenLanguage]);
  
  const handleKeyUp  = useCallback((event: KeyboardEvent) => processInput(event.key), [processInput]);
  
  const handleButtonClick = useCallback((key: string) => processInput(key), [processInput]);
  
  useEffect(() => {
    const fetchSolution = async () => {
      const response = await fetch(`http://localhost:3001/api/words/random/word/:${chosenLanguage}`);
      const { data } = await response.json();

      setSolution(data.word);
      setKeyboardLetters(data.keyboard);
    };
    
    const fetchLang = async () => {
      const response = await fetch('http://localhost:3001/api/collections/languages');
      const { data } = await response.json();

      setWordLanguages(data)
    };

    fetchSolution();
    fetchLang();
  }, [chosenLanguage]);
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp])



  useEffect(() => {
    if (guesses.length > 0) {
      const lastGuess = guesses[guesses.length - 1];
      const wrongLetters: string[] = [];
      
      lastGuess.split('').forEach((letter, index) => {
        if (letter !== solution[index] && !solution.includes(letter)) {
          wrongLetters.push(letter.toLocaleUpperCase(chosenLanguage));
        }
      });
      
      if (wrongLetters.length > 0) {
        setWrongLetter(prev => [...new Set([...prev, ...wrongLetters])]);
      }
    }
  }, [guesses, solution, chosenLanguage]);

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

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChosenLanguage(e.target.value)
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-md md:max-w-xl mx-auto">
          <Header />
          {/* <div className='text-center text-2xl font-bold'>{solution}</div> */}
          <GameBoard 
            solution={solution}
            guesses={guesses}
            currentGuess={currentGuess}
            shake={shake}
            chosenLanguage={chosenLanguage}
          />

          <Keyboard 
            keyboardLetters={keyboardLetters}
            wrongLetter={wrongLetter}
            onButtonClick={handleButtonClick}
          />
        </div>
      </div>

      <Settings 
        chosenLanguage={chosenLanguage}
        wordLanguages={wordLanguages}
        onLanguageChange={handleLanguageChange}
      />

      <Toaster position="top-center" richColors />
    </>
  )
}

export default App;
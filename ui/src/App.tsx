import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import './App.css'
import { Toaster, toast } from 'sonner';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Settings from './components/Settings';

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;
const regex = /^[A-Za-zÇçƏəĞğİıÖöŞşÜüXx]+$/

interface KeyboardLetters {
  KEYBOARD_LETTERS_ROW_1?: string[];
  KEYBOARD_LETTERS_ROW_2?: string[];
  KEYBOARD_LETTERS_ROW_3?: string[];
}

interface Response {
  success: boolean;
  data: {
    position: string[];
    message: string;
  }
}

const checkOrGenerateWord = async (currentGuess: string, guesses: string[]): Promise<Response> => {
  try {
    const response = await fetch('http://localhost:3001/api/check-word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        word: currentGuess,
        generateRandom: guesses.length === 0,
      })
    });
  
    const data: Response = await response.json();
  
    return data; 
  } catch (error) {
    console.error('Error checking or generating word:', error);
    return {
      success: false,
      data: {
        position: [],
        message: 'Error checking or generating word'
      }
    };
  }
};

function App() {

  const [solution, setSolution] = useState<string[]>([]);
  const [letterRepresentation, setLetterRepresentation] = useState<string[][]>([]);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [wrongLetter, setWrongLetter] = useState<string[]>([]);
  const [correctLetter, setCorrectLetter] = useState<string[]>([]);
  // const [flip, setFlip] = useState<number[]>([]);
  const [wordLanguages, setWordLanguages] = useState<string[]>([]);
  const [chosenLanguage, setChosenLanguage] = useState<string>('az');
  const [keyboardLetters, setKeyboardLetters] = useState<KeyboardLetters>({});

  const processInput = useCallback((inputKey: string) => {
    if (gameOver) {
      setGameOver(false);
    }
  
    if (inputKey.length === 1 && regex.test(inputKey)) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(prev => prev + inputKey.toLocaleLowerCase(chosenLanguage));
      }
      return;
    }
  
    if (inputKey === 'Enter') {
      let newGuesses;
      if(currentGuess.length === WORD_LENGTH) {
        newGuesses = [...guesses, currentGuess];
      } else {
        newGuesses = [...guesses];
      }

      checkOrGenerateWord(currentGuess, newGuesses).then(response => {
        if (currentGuess.length === WORD_LENGTH) {
          setGuesses(newGuesses);
          setLetterRepresentation(prev => [...prev, response.data.position]);
          
          const newResponse: string[] = [];

          newResponse.push(...response.data.position);
          setCurrentGuess('');
          
          if ((newResponse.length && newResponse.every(item => item === 'correct')) || newGuesses.length === MAX_ATTEMPTS) {
            if (newResponse.length && newResponse.every(item => item === 'correct')) {
              toast.success('You won!');
            } else {
              toast.error('You lost!');
            }

            setGuesses([]);
            setWrongLetter([]);
            setGameOver(true);
            return;
          }
          return;
        }

        if(!response.success) {
          setShake(true);
          
          setTimeout(() => {
            setShake(false);
          }, 400);
          toast.warning(response.data.message);
        }
        return;
      });
    }
  
    if (inputKey === 'Backspace') {
      if (currentGuess.length > 0) {
        setCurrentGuess(prev => prev.slice(0, -1));
      }
    }
  }, [gameOver, currentGuess, guesses, chosenLanguage]);
  
  const handleKeyUp  = useCallback((event: KeyboardEvent) => processInput(event.key), [processInput]);
  
  const handleButtonClick = useCallback((key: string) => processInput(key), [processInput]);
  
  // FETCH KEYBOARD
  useEffect(() => {    
    const fetchKeyboard = async () => {
      const response = await fetch(`http://localhost:3001/api/keyboard/${chosenLanguage}`);
      const { data } = await response.json();

      setKeyboardLetters(data);
    };

    fetchKeyboard();
  }, [chosenLanguage]);

  // FETCH LANGUAGES AND FIRE POST REQUEST
  useEffect(() => {
    const fetchLang = async () => {
      const response = await fetch('http://localhost:3001/api/collections/languages');
      const { data } = await response.json();

      setWordLanguages(data)
    };

    fetchLang();
    checkOrGenerateWord(currentGuess, guesses);
  }, []);
  
  // HANDLE KEY UP
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp])

  // HANDLE WRONG LETTERS
  useEffect(() => {
    if (guesses.length > 0) {
      const lastGuess = guesses[guesses.length - 1];
      let wrongLetters: string[] = [];
      const correctLetters: string[] = [];
      
      lastGuess.split('').forEach((letter, index) => {
        // if (letter !== solution[index] && !solution.includes(letter)) {
        //   wrongLetters.push(letter.toLocaleUpperCase(chosenLanguage));
        // }

        if(letterRepresentation[letterRepresentation.length - 1][index] === 'correct') {
          correctLetters.push(letter.toLocaleUpperCase(chosenLanguage));
        }

        if(letterRepresentation[letterRepresentation.length - 1][index] === 'wrong') {
          wrongLetters.push(letter.toLocaleUpperCase(chosenLanguage));
        }

      });
      


      if(wrongLetters.length > 0) {
        wrongLetters = wrongLetters
          .filter(letter => !correctLetter.includes(letter) && !correctLetters.includes(letter));
      }

      if (wrongLetters.length > 0) {
        setWrongLetter(prev => [...new Set([...prev, ...wrongLetters])]);
      }

      if (correctLetters.length > 0) {
        setCorrectLetter(prev => [...new Set([...prev, ...correctLetters])]);
      }
    }
  }, [guesses, chosenLanguage, letterRepresentation]);

  // HANDLE LANGUAGE CHANGE
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChosenLanguage(e.target.value)
  }

  return (
    <>
      <div className="bg-white">
        <div className="max-w-md md:max-w-xl mx-auto">
          <Header />

          <GameBoard 
            letterRepresentation={letterRepresentation}
            wordLength={WORD_LENGTH}
            guesses={guesses}
            currentGuess={currentGuess}
            shake={shake}
            chosenLanguage={chosenLanguage}
          />

          <Keyboard 
            keyboardLetters={keyboardLetters}
            wrongLetter={wrongLetter}
            correctLetter={correctLetter}
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
import { useEffect, useState } from 'react';
import './App.css'

const WORD = "react";
const WORD_LENGTH = WORD.length;
const MAX_ATTEMPTS =  6;

const getStatus = (guess: string, answer: string): string[] => {
  const status: string[] = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    if(guess[i] === answer[i]) {
      status.push('correct');
    } else if(answer.includes(guess[i])) {
      status.push('misplaced');
    } else {
      status.push('incorrect');
    }
  }
  return status;
}


function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number[]>([0, 0]);
  const [allStatuses, setAllStatuses] = useState<string[][]>([]);

  const handleKeyUp = (event: KeyboardEvent) => {
    if (guesses.length === MAX_ATTEMPTS) {
      return;
    }

    if (event.key === 'Enter') {
      if (currentGuess.length !== WORD_LENGTH) {
        return;
      }

      const newStatus = getStatus(currentGuess, WORD);
      setGuesses([...guesses, currentGuess]);
      setAllStatuses([...allStatuses, newStatus]);
      setCurrentGuess('');
      setActiveIndex(prev => [prev[0] + 1, 0]);
    }

    if (event.key === 'Backspace' && currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1));
      setActiveIndex(prev => [prev[0], prev[1] - 1]);
    }

    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(currentGuess + event.key.toLowerCase());
        setActiveIndex(prev => [prev[0], prev[1] + 1]);
      }

      return;
    }
    
    return;
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleKeyUp]);

  return (
    <>
      <div className="container mx-auto">
        <h1 className="">Wordle</h1>
        <div className="flex flex-col gap-1 bg-table">
          {
            [...Array(MAX_ATTEMPTS)].map((_, index) => {
              const guess = guesses[index] || (index === guesses.length ? currentGuess : '');
              const isActive = index === activeIndex[0];
              const rowStatus = allStatuses[index] || [];
              return <Row key={index} currentGuess={guess} isActive={isActive} activeIndex={activeIndex} status={rowStatus} guesses={guesses} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default App

function Row({ currentGuess, isActive, activeIndex, status, guesses }: { currentGuess: string, isActive: boolean, activeIndex: number[], status: string[], guesses: string[]}) {
  const getTileStatus = (index: number) => {
    if (guesses.length > 0 && status.length > 0 && index < status.length) {
      if(status[index] === 'correct') {
        return 'bg-tile-correct border-tile-correct';
      }
      if(status[index] === 'misplaced') {
        return 'bg-tile-misplaced border-tile-misplaced';
      }
      if(status[index] === 'incorrect') {
        return 'bg-tile-incorrect border-tile-incorrect';
      }
    }
    return 'bg-tile-empty border-tile-empty';
  }

  return (
    <div className="flex justify-center gap-1">
              {
          [...Array(WORD_LENGTH)].map((_, index) => (
            <div key={index} className={`w-10 h-10 flex items-center justify-center text-xl ${isActive && index === activeIndex[1] ? 'border-green-600' : ''} ${getTileStatus(index)}`}>
              {currentGuess[index]}
            </div>
          ))
        }
    </div>
  )
}
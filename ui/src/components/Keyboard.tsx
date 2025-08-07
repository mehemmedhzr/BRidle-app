import { Delete } from 'lucide-react';

interface KeyboardLetters {
  KEYBOARD_LETTERS_ROW_1?: string[];
  KEYBOARD_LETTERS_ROW_2?: string[];
  KEYBOARD_LETTERS_ROW_3?: string[];
}

interface KeyboardProps {
  keyboardLetters: KeyboardLetters;
  wrongLetter: string[];
  correctLetter: string[];
  onButtonClick: (key: string) => void;
}

export default function Keyboard({ keyboardLetters, wrongLetter, correctLetter, onButtonClick }: KeyboardProps) {
  return (
    <div className="flex justify-center gap-2 flex-col mt-4">
      <div className="flex justify-center gap-1 md:gap-2 flex-wrap">
        {keyboardLetters?.KEYBOARD_LETTERS_ROW_1?.map((letter) => (
          <button 
            onClick={() => onButtonClick(letter)} 
            key={letter} 
            className={`${wrongLetter.includes(letter) ? 'line-through opacity-50' : ''} ${correctLetter.includes(letter) ? 'bg-[#6AAA64] text-white' : 'bg-gray-200'} w-6.5 md:w-10 h-10 md:h-14 text-xs md:text-md flex items-center justify-center text-black border border-[#D3D6DA]`}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-1 md:gap-2 flex-wrap">
        {keyboardLetters?.KEYBOARD_LETTERS_ROW_2?.map((letter) => (
          <button 
            onClick={() => onButtonClick(letter)} 
            key={letter} 
            className={`${wrongLetter.includes(letter) ? 'line-through opacity-50' : ''} ${correctLetter.includes(letter) ? 'bg-[#6AAA64] text-white' : 'bg-gray-200'} w-6.5 md:w-10 h-10 md:h-14 text-xs md:text-md flex items-center justify-center text-black border border-[#D3D6DA]`}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-1 md:gap-2 flex-wrap">
        <button 
          onClick={() => onButtonClick('Enter')} 
          className="w-10 md:w-16 h-10 md:h-14 text-xs md:text-md flex items-center justify-center text-black border bg-gray-200 border-[#D3D6DA]"
        >
          Enter
        </button>
        {keyboardLetters?.KEYBOARD_LETTERS_ROW_3?.map((letter) => (
          <button 
            onClick={() => onButtonClick(letter)} 
            key={letter} 
            className={`${wrongLetter.includes(letter) ? 'line-through opacity-50' : ''} ${correctLetter.includes(letter) ? 'bg-[#6AAA64] text-white' : 'bg-gray-200'} w-6.5 md:w-10 h-10 md:h-14 text-xs md:text-md flex items-center justify-center text-black border border-[#D3D6DA]`}
          >
            {letter}
          </button>
        ))}
        <button 
          onClick={() => onButtonClick('Backspace')} 
          className="w-10 md:w-16 h-10 md:h-14 text-xs md:text-md flex items-center justify-center text-black border bg-gray-200 border-[#D3D6DA]"
        >
          <Delete size={20} />
        </button>
      </div>
    </div>
  );
} 
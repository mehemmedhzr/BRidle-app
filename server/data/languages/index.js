import { azKeyboard, azWords } from './az.js';
import { enKeyboard, enWords } from './en.js';

export const KEYBOARD_LETTERS = {
  az: azKeyboard,
  en: enKeyboard
};

export const wordCollections = {
  ...azWords,
  ...enWords
};

export function getWordCollection(language = 'az', length = 5) {
  const key = `${language}_${length}`;
  return wordCollections[key] || wordCollections.az_5;
}

export function getAvailableCollections() {
  return Object.keys(wordCollections).map(key => {
    const [language, length] = key.split('_');
    return {
      key,
      language,
      length: parseInt(length),
      count: wordCollections[key].length
    };
  });
}

export function getKeyboardLayout(language = 'az') {
  return KEYBOARD_LETTERS[language] || KEYBOARD_LETTERS.az;
} 
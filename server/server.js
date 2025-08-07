import express from 'express';
import cors from 'cors';
import { getWordCollection, getAvailableCollections, getKeyboardLayout } from './data/words.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

let wordCollection = getWordCollection('az', 5);

// GET all words
app.get('/api/words', (req, res) => {
  res.json({
    success: true,
    data: wordCollection,
    count: wordCollection.length
  });
});

// GET word by ID
app.get('/api/words/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const word = wordCollection.find(w => w.id === id);
  
  if (!word) {
    return res.status(404).json({
      success: false,
      message: 'Word not found'
    });
  }
  
  res.json({
    success: true,
    data: word
  });
});

let randomIndex = Math.floor(Math.random() * wordCollection.length);
let randomWord = wordCollection[randomIndex];

// POST check word
app.post('/api/check-word', (req, res) => {
  const { word, generateRandom } = req.body;
  if (generateRandom && word.length === 0) {
    randomIndex = Math.floor(Math.random() * wordCollection.length);
    // randomWord = wordCollection[randomIndex];
    randomWord = { id: 632, word: 'imdad', difficulty: 'hard' };
    console.log(word, 'word')
    console.log(randomWord, 'randomWord')
    return res.status(200).json({
      success: true,
      data:{
        position: [],
        message: 'Word generated successfully'
      }
    });
  }

  
  console.log(word)
  console.log(randomWord)

  if(word && word.length === 5){
    const position = [];
    for(let i = 0; i < word.length; i++){
      if(word[i] === randomWord.word[i]){
        position.push('correct');
        continue;
      } else if(randomWord.word.includes(word[i])){
        const wordArray = word.split('');

        // const misplacedCount = randomWord.word
        //   .split('')
        //   .filter((char, i) => char !== wordArray[i] && wordArray.includes(char))
        //   .length;
        const misplacedCount = wordArray
          .filter((char, i) => char !== randomWord.word[i] && randomWord.word.includes(char))
          .length;

        // const misplacedIndexes = wordArray
        //   .map((char, i) => char !== randomWord.word[i] && randomWord.word.includes(char) ? i : null)
        //   .filter(index => index !== null);

        const misplacedLetters = wordArray
          .filter((char, i) => char !== randomWord.word[i] && randomWord.word.includes(char));

        const correctLetters = wordArray
          .filter((char, i) => char === randomWord.word[i]);

        if(correctLetters.length > 0 && misplacedLetters.length > 0){
          const misplacedLetters2 = misplacedLetters.filter(letter => !correctLetters.includes(letter));
          console.log(misplacedLetters2, 'misplacedLetters2')
          console.log(misplacedLetters2.indexOf(word[i]))
          if(misplacedLetters2.length > 0 && misplacedLetters2.indexOf(word[i]) < misplacedCount){
            position.push('misplaced');
            continue;
          }
        }

        // if (misplacedIndexes.indexOf(i) < misplacedCount) {
        //   position.push('misplaced');
        //   continue;
        // }

        position.push('wrong');
      } else {
        position.push('wrong');
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        position: position,
        message: 'Word checked successfully'
      }
    })
  }

  return res.status(400).json({
    success: false,
    data: {
      position: [],
      message: 'Word must be 5 characters long'
    }
  });
});

// GET random word
app.get('/api/words/random/word/:lang', (req, res) => {
  const language = req.params.lang.slice(1, 3);
  wordCollection = getWordCollection(language);

  const randomIndex = Math.floor(Math.random() * wordCollection.length);
  const randomWord = wordCollection[randomIndex];

  res.json({
    success: true,
    data: {
      word: randomWord.word,
      id: randomWord.id,
    }
  });
});



// GET keyboard layout
app.get('/api/keyboard/:lang', (req, res) => {
  const language = req.params.lang.slice(1, 3);
  res.json({
    success: true,
    data: getKeyboardLayout(language)
  });
});

// GET available collections
app.get('/api/collections', (req, res) => {
  const collections = getAvailableCollections();
  res.json({
    success: true,
    data: collections
  });
});

// GET words by language and length
app.get('/api/words/:language/:length', (req, res) => {
  const { language, length } = req.params;
  const newCollection = getWordCollection(language, parseInt(length));
  
  if (newCollection.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Collection not found'
    });
  }
  
  // Update current collection
  wordCollection = newCollection;
  
  res.json({
    success: true,
    data: wordCollection,
    count: wordCollection.length,
    language,
    length: parseInt(length)
  });
});

// GET available languages
app.get('/api/collections/languages', (req, res) => {
  const collections = getAvailableCollections();
  const languages = new Set();
  collections.map(item => languages.add(item.language))

  res.json({
    success: true,
    data: [...languages]
  })
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    currentCollection: {
      // language: 'az',
      // length: 5,
      count: wordCollection.length
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Word Collection API',
    version: '2.0.0',
    description: 'Multi-language word collection API with support for different word lengths',
    currentCollection: {
      language: 'az',
      length: 5,
      count: wordCollection.length
    },
    endpoints: {
      'GET /api/words': 'Get all words from current collection',
      'GET /api/words/:id': 'Get word by ID',
      'GET /api/words/random/word': 'Get random word',
      'GET /api/words/difficulty/:level': 'Get words by difficulty',
      'GET /api/words/category/:category': 'Get words by category',
      'GET /api/collections': 'Get available collections',
      'GET /api/words/:language/:length': 'Switch to different language/length collection',
      'GET /api/health': 'Health check'
    },
    availableLanguages: ['az', 'en'],
    availableLengths: [5, 6]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 Word collection API with ${wordCollection.length} words`);
}); 
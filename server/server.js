import express from 'express';
import cors from 'cors';
import { getWordCollection, getAvailableCollections } from './data/words.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Get word collection (default: Azerbaijani 5-letter words)
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

// GET random word
app.get('/api/words/random/word', (req, res) => {
  const randomIndex = Math.floor(Math.random() * wordCollection.length);
  const randomWord = wordCollection[randomIndex];
  console.log(randomWord);
  res.json({
    success: true,
    data: {
      word: randomWord.word,
      id: randomWord.id
    }
  });
});

// GET words by difficulty
app.get('/api/words/difficulty/:level', (req, res) => {
  const difficulty = req.params.level.toLowerCase();
  const filteredWords = wordCollection.filter(w => w.difficulty === difficulty);
  
  res.json({
    success: true,
    data: filteredWords,
    count: filteredWords.length
  });
});

// GET words by category
app.get('/api/words/category/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const filteredWords = wordCollection.filter(w => w.category === category);
  
  res.json({
    success: true,
    data: filteredWords,
    count: filteredWords.length
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
    currentCollection: {
      language: 'az',
      length: 5,
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
    availableLengths: [5]
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
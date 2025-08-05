# BRiddle - Wordle Game

A multi-language Wordle game built with React, TypeScript, and Node.js.

## Features

- **Multi-language Support**: Currently supports Azerbaijani (AZ) and English (EN)
- **Settings Menu**: Language selection and future game options
- **Responsive Design**: Works on desktop and mobile devices
- **Virtual Keyboard**: Language-specific keyboard layouts
- **Game Logic**: Complete Wordle game mechanics with color-coded feedback

## Project Structure

### Frontend (`ui/`)

```
src/
├── components/
│   ├── Header.tsx          # Game title and header
│   ├── GameBoard.tsx       # Game grid and tile logic
│   ├── Keyboard.tsx        # Virtual keyboard component
│   └── Settings.tsx        # Settings modal with language selection
├── App.tsx                 # Main game logic and state management
└── index.css              # Global styles and animations
```

### Backend (`server/`)

```
data/
├── languages/
│   ├── index.js           # Language management and exports
│   ├── az.js             # Azerbaijani words and keyboard
│   └── en.js             # English words and keyboard
└── words.js              # Main data exports
```

## Components

### Header
- Displays the game title "BRiddle"
- Clean, minimal design

### GameBoard
- Renders the 6x5 game grid
- Handles tile color logic (green, yellow, gray)
- Shows current guess and previous guesses
- Includes shake animation for invalid inputs

### Keyboard
- Virtual keyboard with language-specific layouts
- Visual feedback for used letters
- Enter and Backspace functionality

### Settings
- Modal-based settings menu
- Language selection dropdown
- Placeholder for future features (difficulty, word length)

## API Endpoints

- `GET /api/words/random/word/:lang` - Get random word for language
- `GET /api/collections/languages` - Get available languages
- `GET /api/collections` - Get all available collections

## Future Features

- Difficulty settings (Easy, Medium, Hard)
- Word length options (4, 5, 6 letters)
- Statistics tracking
- Dark mode toggle
- Sound effects

## Development

```bash
# Start frontend
cd ui && npm run dev

# Start backend
cd server && npm start
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Icons**: Lucide React
- **Notifications**: Sonner

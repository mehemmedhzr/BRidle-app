# Word Collection API

A multi-language Express.js API server that provides collections of words in different languages and lengths. Currently supports Azerbaijani and English with 5-letter words.

## Features

- **Multi-language support**: Azerbaijani and English
- **Flexible word lengths**: Currently 5-letter words (expandable)
- **100 Azerbaijani words**: Comprehensive collection of nouns
- **10 English words**: Sample collection for testing
- **Category filtering**: Filter by various categories
- **Difficulty levels**: Easy, medium, and hard
- **Random word generation**: Get random words for games
- **Collection switching**: Switch between languages and lengths
- **Health check endpoint**: Monitor API status

## Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   # For development (with auto-restart)
   npm run dev
   
   # For production
   npm start
   ```

The server will start on `http://localhost:3001`

## API Endpoints

### Get All Words
```
GET /api/words
```

### Get Word by ID
```
GET /api/words/:id
```

### Get Random Word
```
GET /api/words/random/word
```

### Get Words by Difficulty
```
GET /api/words/difficulty/:level
```
Levels: `easy`, `medium`, `hard`

### Get Available Collections
```
GET /api/collections
```

### Switch Collection
```
GET /api/words/:language/:length
```
Example: `GET /api/words/az/5` for Azerbaijani 5-letter words

### Get Words by Category
```
GET /api/words/category/:category
```
Categories: `əşya`, `mebel`, `tikinti`, `içki`, `qida`, `texnologiya`, `nəqliyyat`, `təhsil`, `sağlamlıq`, `peşə`, `din`, `ticarət`, `qidalanma`, `yaşayış`, `təbiət`, `hava`, `heyvan`, `anatomiya`

### Health Check
```
GET /api/health
```

### API Info
```
GET /
```

## Sample Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "word": "qələm",
      "definition": "Yazmaq üçün istifadə edilən alət",
      "category": "əşya",
      "difficulty": "easy"
    }
  ],
  "count": 100
}
```

## Word Collections

### Azerbaijani (az_5) - 100 words
**Categories include:**
- **əşya** (objects): qələm, kitab, çanta, saat, etc.
- **mebel** (furniture): masa
- **tikinti** (construction): pəncərə, qapı
- **içki** (drinks): çay
- **qida** (food): çörək, süd, yağ, duz, şəkər
- **texnologiya** (technology): telefon, kompüter
- **nəqliyyat** (transport): avtomobil, velosiped, təyyarə, gəmi, qatar
- **təhsil** (education): məktəb, universitet, kitabxana
- **sağlamlıq** (health): xəstəxana, aptek
- **peşə** (professions): həkim, müəllim, mühəndis, dəmirçi
- **din** (religion): təssəvüf, məscid, kilsə, sinəqoqa
- **ticarət** (commerce): bazar, mağaza
- **qidalanma** (dining): restoran, kafə, çayxana
- **yaşayış** (living): mehmanxana, ev, otaq
- **təbiət** (nature): bağça, park, meşə, çay, çöl, dağ, dəniz, göl, çeşmə, bulaq
- **hava** (weather): qar, yağış, külək, günəş, ay, ulduz, bulud, şimşək, göyqurşağı
- **heyvan** (animals): at, it, pişik, qoyun, keçi, inək, öküz, toyuq, ördək, qaz, qartal, qarğa, sərçə, balıq, ilan, kərtənkələ, həşərat, kəpənək, arı, qarışqa, hörümçək, milçək, ağcaqanad, cırcırama, qurbağa, tısbağa, dəniz qızı, dəniz ulduzu, xərçəng, midya
- **anatomiya** (anatomy): sümük, qan, ürək, beyin, ağciyər, mədə, bağırsaq, qaraciyər, böyrək, dəri

### English (en_5) - 10 words
Horse-related vocabulary for testing purposes.

Each word has different difficulty levels: easy, medium, and hard. 
// Word collections for different languages and lengths
export const wordCollections = {
  // Azerbaijani 5-letter words
  az_5: [
    // {
    //   id: 9999999,
    //   word: "qələm",
    //   definition: "Yazmaq üçün istifadə edilən alət",
    //   category: "əşya",
    //   difficulty: "easy"
    // },
    {
      id: 1,
      word: "aaaaa",
      definition: "Yazmaq",
      category: "əşya",
      difficulty: "easy"
    },
  ],

  az_6: [
    {
      id: 1,
      word: "bbbbbb",
      definition: "Yazmaq",
      category: "əşya",
      difficulty: "easy"
    },
  ],

  en_5: [
    {
      id: 1,
      word: "BRIDLE",
      definition: "A headgear for controlling a horse",
      category: "equipment",
      difficulty: "medium"
    },
    {
      id: 2,
      word: "SADDLE",
      definition: "A seat for a rider on the back of a horse",
      category: "equipment",
      difficulty: "easy"
    },
    {
      id: 3,
      word: "STABLE",
      definition: "A building for housing horses",
      category: "building",
      difficulty: "easy"
    },
    {
      id: 4,
      word: "TROT",
      definition: "A two-beat diagonal gait of a horse",
      category: "movement",
      difficulty: "medium"
    },
    {
      id: 5,
      word: "CANTER",
      definition: "A three-beat gait of a horse",
      category: "movement",
      difficulty: "hard"
    },
    {
      id: 6,
      word: "GALLOP",
      definition: "The fastest gait of a horse",
      category: "movement",
      difficulty: "easy"
    },
    {
      id: 7,
      word: "MANE",
      definition: "Long hair growing from the neck of a horse",
      category: "anatomy",
      difficulty: "easy"
    },
    {
      id: 8,
      word: "HOOF",
      definition: "The hard covering on the foot of a horse",
      category: "anatomy",
      difficulty: "easy"
    },
    {
      id: 9,
      word: "REINS",
      definition: "Straps used to control a horse",
      category: "equipment",
      difficulty: "medium"
    },
    {
      id: 10,
      word: "PADDOCK",
      definition: "A small field or enclosure for horses",
      category: "location",
      difficulty: "hard"
    }
  ]
};

// Helper function to get word collection by language and length
export function getWordCollection(language = 'az', length = 5) {
  console.log('inner ', language)
  const key = `${language}_${length}`;
  return wordCollections[key] || wordCollections.az_5;
}

// Helper function to get available collections
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
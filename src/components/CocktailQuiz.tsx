'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface QuizOption {
  id: string;
  label: string;
  icon: string;
  value: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface CocktailResult {
  name: string;
  brand: 'bib' | 'redemption';
  spirit: string;
  description: string;
  ingredients: string[];
  occasion: string;
  image?: string;
}

const questions: QuizQuestion[] = [
  {
    id: 'occasion',
    question: "What's the occasion?",
    options: [
      { id: 'cozy', label: 'Cozy Night In', icon: '🏠', value: 'cozy' },
      { id: 'party', label: 'Holiday Party', icon: '🎉', value: 'party' },
      { id: 'dinner', label: 'Special Dinner', icon: '🍽️', value: 'dinner' },
      { id: 'celebration', label: 'Celebration', icon: '🥂', value: 'celebration' },
    ],
  },
  {
    id: 'flavor',
    question: 'What flavor profile appeals to you?',
    options: [
      { id: 'sweet', label: 'Sweet & Smooth', icon: '🍯', value: 'sweet' },
      { id: 'spicy', label: 'Bold & Spicy', icon: '🌶️', value: 'spicy' },
      { id: 'smoky', label: 'Smoky & Complex', icon: '🔥', value: 'smoky' },
      { id: 'fresh', label: 'Fresh & Citrusy', icon: '🍋', value: 'fresh' },
    ],
  },
  {
    id: 'temperature',
    question: 'How do you like your drink?',
    options: [
      { id: 'neat', label: 'Neat or On the Rocks', icon: '🥃', value: 'neat' },
      { id: 'cold', label: 'Shaken & Chilled', icon: '🧊', value: 'cold' },
      { id: 'warm', label: 'Warm & Comforting', icon: '☕', value: 'warm' },
      { id: 'bubbly', label: 'With Bubbles', icon: '🫧', value: 'bubbly' },
    ],
  },
  {
    id: 'complexity',
    question: 'How complex should it be?',
    options: [
      { id: 'simple', label: 'Simple (2-3 ingredients)', icon: '✨', value: 'simple' },
      { id: 'classic', label: 'Classic Recipe', icon: '📜', value: 'classic' },
      { id: 'craft', label: 'Craft Cocktail', icon: '🎨', value: 'craft' },
      { id: 'surprise', label: 'Surprise Me!', icon: '🎁', value: 'surprise' },
    ],
  },
];

const cocktailResults: Record<string, CocktailResult> = {
  'cozy-sweet-warm-simple': {
    name: 'Hot Toddy',
    brand: 'bib',
    spirit: 'Bib & Tucker Classic Six',
    description: 'The perfect warming drink for a cozy night. Simple, soothing, and utterly comforting.',
    ingredients: ['2 oz Bib & Tucker Classic Six', '1 tbsp honey', '0.5 oz lemon juice', '4 oz hot water', 'Cinnamon stick'],
    occasion: 'Cozy nights by the fire',
  },
  'cozy-smoky-neat-simple': {
    name: 'Campfire Old Fashioned',
    brand: 'bib',
    spirit: 'Bib & Tucker Double Char',
    description: 'Smoky, rich, and perfect for contemplative evenings. The maple and walnut notes create depth.',
    ingredients: ['2 oz Bib & Tucker Double Char', '0.25 oz maple syrup', '2 dashes walnut bitters', 'Orange peel'],
    occasion: 'Fireside sipping',
  },
  'party-fresh-cold-classic': {
    name: 'Gold Rush',
    brand: 'redemption',
    spirit: 'Redemption Bourbon',
    description: 'Crowd-pleasing and refreshing. The honey sweetness makes it approachable for all guests.',
    ingredients: ['2 oz Redemption Bourbon', '1 oz honey syrup', '0.75 oz fresh lemon juice'],
    occasion: 'Holiday entertaining',
  },
  'party-spicy-cold-craft': {
    name: 'Spiced Gold Rush',
    brand: 'redemption',
    spirit: 'Redemption Bourbon',
    description: 'A festive twist on the classic with warming ginger. Perfect for holiday gatherings.',
    ingredients: ['2 oz Redemption Bourbon', '1 oz honey-ginger syrup', '0.75 oz fresh lemon', 'Candied ginger'],
    occasion: 'Holiday parties',
  },
  'dinner-spicy-neat-classic': {
    name: 'Holiday Manhattan',
    brand: 'redemption',
    spirit: 'Redemption Rye',
    description: 'The quintessential dinner cocktail. Elegant, balanced, and timeless.',
    ingredients: ['2 oz Redemption Rye', '1 oz sweet vermouth', '2 dashes Angostura bitters', 'Luxardo cherry'],
    occasion: 'Elegant dinners',
  },
  'dinner-smoky-neat-craft': {
    name: 'Tennessee Winter',
    brand: 'bib',
    spirit: 'Bib & Tucker Classic Six',
    description: 'Complex and sophisticated. Port wine adds depth while allspice brings holiday warmth.',
    ingredients: ['2 oz Bib & Tucker Classic Six', '0.5 oz port wine', '0.25 oz allspice dram', '2 dashes orange bitters'],
    occasion: 'Special dinners',
  },
  'celebration-sweet-bubbly-craft': {
    name: 'Midnight Manhattan',
    brand: 'bib',
    spirit: 'Bib & Tucker Classic Six',
    description: 'A celebratory twist on the classic. The champagne float adds effervescence and elegance.',
    ingredients: ['1.5 oz Bib & Tucker Classic Six', '0.75 oz sweet vermouth', '2 dashes bitters', 'Champagne float'],
    occasion: "New Year's Eve",
  },
  'celebration-fresh-bubbly-classic': {
    name: 'Resolution Fizz',
    brand: 'redemption',
    spirit: 'Redemption Rye',
    description: 'Light, effervescent, and perfect for toasting. Elderflower adds floral elegance.',
    ingredients: ['1.5 oz Redemption Rye', '0.5 oz elderflower liqueur', '0.5 oz lemon', 'Sparkling wine top'],
    occasion: 'Celebrations',
  },
  // Default/catch-all results
  'default-bib': {
    name: 'Gold Roast Elevated',
    brand: 'bib',
    spirit: 'Bib & Tucker Gold Roast',
    description: 'A unique coffee-infused bourbon cocktail. Perfect for those who appreciate complexity.',
    ingredients: ['2 oz Bib & Tucker Gold Roast', '0.25 oz demerara syrup', '2 dashes Angostura bitters', 'Orange peel'],
    occasion: 'After dinner',
  },
  'default-redemption': {
    name: 'Whiskey Sour',
    brand: 'redemption',
    spirit: 'Redemption High Rye Bourbon',
    description: 'A perfect balance of sweet, sour, and spicy. The high rye content adds wonderful complexity.',
    ingredients: ['2 oz Redemption High Rye Bourbon', '0.75 oz lemon juice', '0.5 oz simple syrup', 'Egg white (optional)'],
    occasion: 'Any occasion',
  },
};

// Get result based on answers
const getResult = (answers: Record<string, string>): CocktailResult => {
  const key = `${answers.occasion}-${answers.flavor}-${answers.temperature}-${answers.complexity}`;

  // Try exact match first
  if (cocktailResults[key]) {
    return cocktailResults[key];
  }

  // Try partial matches
  const partialKeys = Object.keys(cocktailResults).filter(k => {
    const parts = k.split('-');
    return parts.some(p => Object.values(answers).includes(p));
  });

  if (partialKeys.length > 0) {
    // Pick one based on preference for certain combinations
    if (answers.flavor === 'smoky' || answers.flavor === 'sweet') {
      const bibResult = partialKeys.find(k => cocktailResults[k].brand === 'bib');
      if (bibResult) return cocktailResults[bibResult];
    }
    return cocktailResults[partialKeys[0]];
  }

  // Default based on flavor preference
  if (answers.flavor === 'smoky' || answers.occasion === 'cozy') {
    return cocktailResults['default-bib'];
  }
  return cocktailResults['default-redemption'];
};

export default function CocktailQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CocktailResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      // Calculate result
      setIsCalculating(true);
      setTimeout(() => {
        setResult(getResult(newAnswers));
        setIsCalculating(false);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const brandColors = {
    bib: { primary: '#C85A36', secondary: '#BDA55D' },
    redemption: { primary: '#FD9419', secondary: '#D4A04A' },
  };

  return (
    <>
      {/* Quiz trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-6 right-6 z-40 px-6 py-4 rounded-2xl font-medium shadow-2xl flex items-center gap-3"
        style={{
          background: 'linear-gradient(135deg, #C85A36, #FD9419)',
          color: '#FFFFFF',
        }}
      >
        <span className="text-xl">🍸</span>
        <span>Find Your Cocktail</span>
      </motion.button>

      {/* Quiz modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div
                className="p-6 text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)' }}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <span className="text-3xl mb-2 block">🍸</span>
                  <h3 className="text-2xl font-bold">Find Your Perfect Cocktail</h3>
                  <p className="text-sm opacity-80 mt-1">Answer 4 quick questions</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Progress bar */}
                {!result && !isCalculating && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs mb-2" style={{ color: '#8B8B8B' }}>
                      <span>Question {currentQuestion + 1} of {questions.length}</span>
                      <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #C85A36, #FD9419)' }}
                      />
                    </div>
                  </div>
                )}

                {/* Question */}
                {!result && !isCalculating && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-xl font-bold mb-6 text-center" style={{ color: '#1A1410' }}>
                        {questions[currentQuestion].question}
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {questions[currentQuestion].options.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 rounded-xl text-left transition-all border-2 border-transparent hover:border-[#C85A36]/30"
                            style={{ background: '#F5F3F0' }}
                          >
                            <span className="text-2xl mb-2 block">{option.icon}</span>
                            <span className="font-medium" style={{ color: '#1A1410' }}>
                              {option.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Calculating */}
                {isCalculating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-gray-200"
                      style={{ borderTopColor: '#C85A36' }}
                    />
                    <p className="font-medium" style={{ color: '#6B6B6B' }}>
                      Mixing your perfect cocktail...
                    </p>
                  </motion.div>
                )}

                {/* Result */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-4xl mb-3 block">🎉</span>
                      <p className="text-sm uppercase tracking-wider mb-2" style={{ color: '#8B8B8B' }}>
                        Your perfect cocktail is
                      </p>
                      <h4
                        className="text-3xl font-bold"
                        style={{ color: brandColors[result.brand].primary }}
                      >
                        {result.name}
                      </h4>
                    </div>

                    <div
                      className="rounded-xl p-4 mb-4"
                      style={{ background: `${brandColors[result.brand].primary}10` }}
                    >
                      <p className="text-sm font-medium mb-1" style={{ color: brandColors[result.brand].primary }}>
                        {result.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'} • {result.spirit}
                      </p>
                      <p className="text-sm" style={{ color: '#6B6B6B' }}>
                        {result.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm font-medium mb-2" style={{ color: '#1A1410' }}>
                        Ingredients:
                      </p>
                      <ul className="space-y-1">
                        {result.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#4A4A4A' }}>
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: brandColors[result.brand].primary }}
                            />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        onClick={resetQuiz}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 rounded-xl font-medium border-2"
                        style={{
                          borderColor: brandColors[result.brand].primary,
                          color: brandColors[result.brand].primary,
                        }}
                      >
                        Try Again
                      </motion.button>
                      <motion.button
                        onClick={() => setIsOpen(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 rounded-xl font-medium text-white"
                        style={{
                          background: `linear-gradient(135deg, ${brandColors[result.brand].primary}, ${brandColors[result.brand].secondary})`,
                        }}
                      >
                        View Recipe
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

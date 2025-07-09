import { TypingStats, CharacterState } from '@/types/typing';

export const calculateStats = (
  characters: CharacterState[],
  timeElapsed: number
): TypingStats => {
  const correctChars = characters.filter(c => c.status === 'correct').length;
  const incorrectChars = characters.filter(c => c.status === 'incorrect').length;
  const totalChars = correctChars + incorrectChars;
  
  const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / (timeElapsed / 60)) : 0;
  const cpm = timeElapsed > 0 ? Math.round(correctChars / (timeElapsed / 60)) : 0;
  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
  
  return {
    wpm,
    cpm,
    accuracy,
    errors: incorrectChars,
    correctChars,
    incorrectChars,
    totalChars,
    timeElapsed
  };
};

export const generateWordList = (wordCount: number): string => {
  const commonWords = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
    'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
    'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
    'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
    'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
    'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come',
    'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how',
    'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
    'any', 'these', 'give', 'day', 'most', 'us', 'find', 'water', 'long',
    'down', 'part', 'may', 'right', 'old', 'great', 'world', 'still', 'own',
    'under', 'last', 'another', 'while', 'house', 'small', 'found', 'every',
    'name', 'very', 'through', 'much', 'where', 'help', 'line', 'turn',
    'cause', 'same', 'mean', 'differ', 'move', 'right', 'boy', 'show',
    'three', 'near', 'build', 'self', 'earth', 'father', 'head', 'stand',
    'own', 'page', 'should', 'country', 'school', 'sound', 'answer', 'room',
    'until', 'thought', 'city', 'tree', 'cross', 'farm', 'hard', 'start',
    'might', 'story', 'saw', 'far', 'sea', 'draw', 'left', 'late', 'run',
    'dont', 'while', 'press', 'close', 'night', 'real', 'life', 'few',
    'north', 'open', 'seem', 'together', 'next', 'white', 'children', 'begin',
    'got', 'walk', 'example', 'ease', 'paper', 'group', 'always', 'music',
    'those', 'both', 'mark', 'often', 'letter', 'until', 'mile', 'river',
    'car', 'feet', 'care', 'second', 'book', 'carry', 'took', 'science',
    'eat', 'room', 'friend', 'began', 'idea', 'fish', 'mountain', 'stop',
    'once', 'base', 'hear', 'horse', 'cut', 'sure', 'watch', 'color',
    'face', 'wood', 'main', 'enough', 'plain', 'girl', 'usual', 'young',
    'ready', 'above', 'ever', 'red', 'list', 'though', 'feel', 'talk',
    'bird', 'soon', 'body', 'dog', 'family', 'direct', 'pose', 'leave',
    'song', 'measure', 'door', 'product', 'black', 'short', 'numeral',
    'class', 'wind', 'question', 'happen', 'complete', 'ship', 'area',
    'half', 'rock', 'order', 'fire', 'south', 'problem', 'piece', 'told',
    'knew', 'pass', 'since', 'top', 'whole', 'king', 'space', 'heard',
    'best', 'hour', 'better', 'during', 'hundred', 'five', 'remember',
    'step', 'early', 'hold', 'west', 'ground', 'interest', 'reach', 'fast',
    'verb', 'sing', 'listen', 'six', 'table', 'travel', 'less', 'morning',
    'ten', 'simple', 'several', 'vowel', 'toward', 'war', 'lay', 'against',
    'pattern', 'slow', 'center', 'love', 'person', 'money', 'serve',
    'appear', 'road', 'map', 'rain', 'rule', 'govern', 'pull', 'cold',
    'notice', 'voice', 'unit', 'power', 'town', 'fine', 'certain', 'fly',
    'fall', 'lead', 'cry', 'dark', 'machine', 'note', 'wait', 'plan',
    'figure', 'star', 'box', 'noun', 'field', 'rest', 'correct', 'able',
    'pound', 'done', 'beauty', 'drive', 'stood', 'contain', 'front',
    'teach', 'week', 'final', 'gave', 'green', 'oh', 'quick', 'develop',
    'ocean', 'warm', 'free', 'minute', 'strong', 'special', 'mind',
    'behind', 'clear', 'tail', 'produce', 'fact', 'street', 'inch',
    'multiply', 'nothing', 'course', 'stay', 'wheel', 'full', 'force',
    'blue', 'object', 'decide', 'surface', 'deep', 'moon', 'island',
    'foot', 'system', 'busy', 'test', 'record', 'boat', 'common', 'gold',
    'possible', 'plane', 'stead', 'dry', 'wonder', 'laugh', 'thousands',
    'ago', 'ran', 'check', 'game', 'shape', 'equate', 'hot', 'miss',
    'brought', 'heat', 'snow', 'tire', 'bring', 'yes', 'distant', 'fill',
    'east', 'paint', 'language', 'among'
  ];
  
  // Shuffle the array to get more variety
  const shuffled = [...commonWords].sort(() => Math.random() - 0.5);
  
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(shuffled[i % shuffled.length]);
  }
  
  return words.join(' ');
};

export const quotes = [
  {
    text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens to you while you're busy making other plans. Time you enjoy wasting is not wasted time.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams. Dreams don't work unless you do.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light. Happiness can be found even in the darkest of times.",
    author: "Aristotle"
  },
  {
    text: "The only impossible journey is the one you never begin. Success is not final, failure is not fatal, it is the courage to continue that counts.",
    author: "Tony Robbins"
  }
];

export const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const playKeySound = (volume: number = 0.5) => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = volume * 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }
};
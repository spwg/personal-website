// Word list - common 5-letter words (subset of Wordle word list)
const WORD_LIST = [
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
  'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
  'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
  'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ARROW', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE',
  'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BEING',
  'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLAST', 'BLEND', 'BLESS',
  'BLIND', 'BLOCK', 'BLOOD', 'BLOOM', 'BLOWN', 'BLUES', 'BOARD', 'BOAST', 'BOBBY', 'BONUS',
  'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREED',
  'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BRUSH', 'BUDDY', 'BUILD', 'BUILT', 'BUNCH',
  'BURST', 'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM',
  'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CHUNK',
  'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD',
  'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM',
  'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED',
  'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DELTA', 'DENSE', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN',
  'DRAFT', 'DRAMA', 'DRANK', 'DRAWN', 'DREAM', 'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE',
  'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER',
  'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE',
  'FANCY', 'FATAL', 'FAULT', 'FIBER', 'FIELD', 'FIERY', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL',
  'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLESH', 'FLOAT', 'FLOOD', 'FLOOR', 'FLUID', 'FOCUS',
  'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT',
  'FROST', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GLORY', 'GOLDEN',
  'GRACE', 'GRADE', 'GRAIN', 'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS',
  'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HARRY', 'HEART', 'HEAVY',
  'HENCE', 'HENRY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'HURRY', 'IMAGE', 'INDEX', 'INNER',
  'INPUT', 'INTRO', 'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL',
  'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL',
  'LEVEL', 'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH',
  'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT',
  'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL',
  'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY',
  'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN',
  'ORDER', 'ORGAN', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER',
  'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE',
  'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT',
  'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO',
  'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REALM', 'REBEL', 'REFER', 'RELAX',
  'REPLY', 'RIDER', 'RIDGE', 'RIGHT', 'RIGID', 'RISKY', 'RIVER', 'ROBOT', 'ROCKY', 'ROMAN',
  'ROUGH', 'ROUND', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE',
  'SEVEN', 'SHADE', 'SHAKE', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL',
  'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORE', 'SHORT', 'SHOWN', 'SIDES', 'SIGHT',
  'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE',
  'SMITH', 'SMOKE', 'SNOWY', 'SOLAR', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE',
  'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE',
  'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STICK', 'STILL',
  'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF',
  'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH',
  'TEAMS', 'TEETH', 'TERMS', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE',
  'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGHT',
  'TIMER', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK',
  'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRULY',
  'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'TWIST', 'TYLER', 'UNCLE', 'UNDER', 'UNDUE', 'UNION',
  'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USING', 'USUAL', 'VALUE', 'VIDEO',
  'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE',
  'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE',
  'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YARDS', 'YEARS', 'YOUNG', 'YOURS',
  'YOUTH'
];

// Valid guess words (can include more words than the answer list)
const VALID_GUESSES = new Set([...WORD_LIST]);

// Get word for a specific date (deterministic)
function getWordForDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const startDate = new Date('2024-01-01T00:00:00');
  const diffTime = date - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const index = diffDays % WORD_LIST.length;
  return WORD_LIST[index];
}

// Check if device is mobile
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.innerWidth <= 700);
}

// Game state
let currentDate = new Date().toISOString().split('T')[0];
let currentWord = '';
let guesses = [];
let currentGuess = '';
let attempt = 0;
let gameWon = false;
let gameLost = false;

// DOM elements
const gameBoard = document.getElementById('game-board');
const messageEl = document.getElementById('message');
const dateSelector = document.getElementById('date-selector');
const shareContainer = document.getElementById('share-container');
const shareButton = document.getElementById('share-button');

// Initialize
function init() {
  dateSelector.value = currentDate;
  dateSelector.max = currentDate; // Can't select future dates
  
  dateSelector.addEventListener('change', (e) => {
    currentDate = e.target.value;
    loadGame();
  });

  shareButton.addEventListener('click', shareResult);

  // Keyboard input
  document.addEventListener('keydown', handleKeyPress);
  
  // On-screen keyboard
  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
      const keyValue = key.getAttribute('data-key');
      if (keyValue === 'Enter') {
        submitGuess();
      } else if (keyValue === 'Backspace') {
        deleteLetter();
      } else {
        addLetter(keyValue);
      }
    });
  });

  loadGame();
}

// Load game state from localStorage or initialize new game
function loadGame() {
  const storageKey = `wordle-${currentDate}`;
  const savedState = localStorage.getItem(storageKey);
  
  currentWord = getWordForDate(currentDate);
  
  if (savedState) {
    const state = JSON.parse(savedState);
    guesses = state.guesses || [];
    attempt = state.attempt || 0;
    gameWon = state.gameWon || false;
    gameLost = state.gameLost || false;
    currentGuess = state.currentGuess || '';
  } else {
    guesses = [];
    attempt = 0;
    gameWon = false;
    gameLost = false;
    currentGuess = '';
  }

  renderGame();
  updateKeyboard();
  updateMessage();
  updateShareButton();
}

// Save game state to localStorage
function saveGame() {
  const storageKey = `wordle-${currentDate}`;
  const state = {
    guesses,
    attempt,
    gameWon,
    gameLost,
    currentGuess
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}

  // Render game board
function renderGame() {
  gameBoard.innerHTML = '';
  
  for (let i = 0; i < 5; i++) {
    const row = document.createElement('div');
    row.className = 'game-row';
    
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement('div');
      cell.className = 'game-cell';
      
      if (i < guesses.length) {
        // Already guessed row
        const guess = guesses[i];
        const letter = guess.word[j] || '';
        const status = guess.status[j];
        
        cell.textContent = letter;
        cell.classList.add('filled');
        cell.classList.add(status);
      } else if (i === guesses.length && j < currentGuess.length) {
        // Current guess row
        cell.textContent = currentGuess[j];
        cell.classList.add('filled');
      }
      
      row.appendChild(cell);
    }
    
    gameBoard.appendChild(row);
  }
}

// Evaluate guess
function evaluateGuess(guess, target) {
  const status = ['absent', 'absent', 'absent', 'absent', 'absent'];
  const targetCounts = {};
  const guessCounts = {};
  
  // Count letters in target
  for (let i = 0; i < target.length; i++) {
    targetCounts[target[i]] = (targetCounts[target[i]] || 0) + 1;
  }
  
  // First pass: mark correct positions (green)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      status[i] = 'correct';
      guessCounts[guess[i]] = (guessCounts[guess[i]] || 0) + 1;
    }
  }
  
  // Second pass: mark present letters (yellow)
  for (let i = 0; i < guess.length; i++) {
    if (status[i] !== 'correct') {
      const letter = guess[i];
      const correctCount = (status.filter((s, idx) => s === 'correct' && guess[idx] === letter)).length;
      const yellowCount = (status.filter((s, idx) => s === 'present' && guess[idx] === letter)).length;
      const totalUsed = correctCount + yellowCount;
      
      if (targetCounts[letter] && totalUsed < targetCounts[letter]) {
        status[i] = 'present';
        guessCounts[letter] = (guessCounts[letter] || 0) + 1;
      }
    }
  }
  
  return status;
}

// Handle keyboard input
function handleKeyPress(e) {
  if (gameWon || gameLost) return;
  
  if (e.key === 'Enter') {
    submitGuess();
  } else if (e.key === 'Backspace') {
    deleteLetter();
  } else if (e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
    addLetter(e.key.toUpperCase());
  }
}

// Add letter to current guess
function addLetter(letter) {
  if (currentGuess.length < 5 && !gameWon && !gameLost) {
    currentGuess += letter;
    renderGame();
  }
}

// Delete letter from current guess
function deleteLetter() {
  if (currentGuess.length > 0 && !gameWon && !gameLost) {
    currentGuess = currentGuess.slice(0, -1);
    renderGame();
  }
}

// Submit guess
function submitGuess() {
  if (gameWon || gameLost) return;
  
  if (currentGuess.length !== 5) {
    showMessage('Not enough letters');
    return;
  }
  
  if (!VALID_GUESSES.has(currentGuess)) {
    showMessage('Not a valid word');
    return;
  }
  
  const status = evaluateGuess(currentGuess, currentWord);
  guesses.push({ word: currentGuess, status });
  attempt++;
  currentGuess = '';
  
  // Check win/loss
  if (currentWord === guesses[guesses.length - 1].word) {
    gameWon = true;
    showMessage('You won!');
  } else if (attempt >= 5) {
    gameLost = true;
    showMessage(`Game over! The word was: ${currentWord}`);
  } else {
    showMessage('');
  }
  
  saveGame();
  renderGame();
  updateKeyboard();
  updateShareButton();
}

// Update keyboard colors
function updateKeyboard() {
  const keyStates = {};
  
  guesses.forEach(guess => {
    for (let i = 0; i < guess.word.length; i++) {
      const letter = guess.word[i];
      const status = guess.status[i];
      
      if (!keyStates[letter] || status === 'correct') {
        keyStates[letter] = status;
      } else if (status === 'present' && keyStates[letter] === 'absent') {
        keyStates[letter] = 'present';
      }
    }
  });
  
  document.querySelectorAll('.key').forEach(key => {
    const letter = key.getAttribute('data-key');
    if (letter && letter.length === 1) {
      key.classList.remove('correct', 'present', 'absent');
      if (keyStates[letter]) {
        key.classList.add(keyStates[letter]);
      }
    }
  });
}

// Update message
function updateMessage() {
  if (gameWon) {
    messageEl.textContent = 'You won!';
  } else if (gameLost) {
    messageEl.textContent = `Game over! The word was: ${currentWord}`;
  } else {
    messageEl.textContent = '';
  }
}

function showMessage(msg) {
  messageEl.textContent = msg;
  if (msg) {
    setTimeout(() => {
      if (messageEl.textContent === msg) {
        messageEl.textContent = '';
      }
    }, 2000);
  }
}

// Update share button visibility
function updateShareButton() {
  if (gameWon && isMobileDevice()) {
    shareContainer.style.display = 'block';
  } else {
    shareContainer.style.display = 'none';
  }
}

// Share result
function shareResult() {
  if (!gameWon) return;
  
  let shareText = `Wordle ${currentDate} ${attempt}/5\n\n`;
  
  guesses.forEach(guess => {
    guess.status.forEach(status => {
      if (status === 'correct') {
        shareText += '🟩';
      } else if (status === 'present') {
        shareText += '🟨';
      } else {
        shareText += '⬜';
      }
    });
    shareText += '\n';
  });
  
  const smsLink = `sms:?body=${encodeURIComponent(shareText)}`;
  window.location.href = smsLink;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}


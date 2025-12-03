// Word lists loaded from JSON files
let WORD_LIST = []; // Answer words (for daily word selection)
let VALID_GUESSES = new Set(); // All valid guess words (dictionary)

// Load word lists from JSON files
async function loadWordLists() {
  try {
    const [answersResponse, dictionaryResponse] = await Promise.all([
      fetch('/data/wordle-answers.json'),
      fetch('/data/wordle-dictionary.json')
    ]);
    
    if (!answersResponse.ok || !dictionaryResponse.ok) {
      throw new Error('Failed to load word lists');
    }
    
    WORD_LIST = await answersResponse.json();
    const dictionary = await dictionaryResponse.json();
    VALID_GUESSES = new Set(dictionary);
  } catch (error) {
    console.error('Error loading word lists:', error);
    showMessage('Error loading word lists. Please refresh the page.');
    throw error;
  }
}

// Get word for a specific date (deterministic)
function getWordForDate(dateStr) {
  if (WORD_LIST.length === 0) {
    throw new Error('Word list not loaded');
  }
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
const menuButton = document.getElementById('menu-button');
const dateMenu = document.getElementById('date-menu');
const closeMenuButton = document.getElementById('close-menu-button');
const dateButtons = document.getElementById('date-buttons');
const shareContainer = document.getElementById('share-container');
const shareButton = document.getElementById('share-button');

// Initialize
async function init() {
  // Show loading message
  showMessage('Loading word lists...');
  
  try {
    // Load word lists first
    await loadWordLists();
    
    // Generate last 7 days
    generateDateButtons();
    
    // Menu interactions
    menuButton.addEventListener('click', () => {
      dateMenu.style.display = dateMenu.style.display === 'none' ? 'block' : 'none';
    });
    
    closeMenuButton.addEventListener('click', () => {
      dateMenu.style.display = 'none';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!dateMenu.contains(e.target) && !menuButton.contains(e.target)) {
        dateMenu.style.display = 'none';
      }
    });

    shareButton.addEventListener('click', shareResult);
    // Keyboard input
    document.addEventListener('keydown', handleKeyPress);
    
    // On-screen keyboard
    document.querySelectorAll('.key').forEach(key => {
      key.addEventListener('click', () => {
        const keyValue = key.getAttribute('data-key');
        highlightKey(keyValue);
        if (keyValue === 'Enter') {
          submitGuess();
        } else if (keyValue === 'Backspace') {
          deleteLetter();
        } else {
          addLetter(keyValue);
        }
      });
    });

    // Clear loading message and load game
    showMessage('');
    loadGame();
  } catch (error) {
    // Error already shown in loadWordLists
  }
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

// Highlight a key on the keyboard
function highlightKey(keyValue) {
  const key = document.querySelector(`.key[data-key="${keyValue}"]`);
  if (key) {
    key.classList.add('pressed');
    setTimeout(() => {
      key.classList.remove('pressed');
    }, 150);
  }
}

// Handle keyboard input
function handleKeyPress(e) {
  if (gameWon || gameLost) return;
  
  if (e.key === 'Enter') {
    highlightKey('Enter');
    submitGuess();
  } else if (e.key === 'Backspace') {
    highlightKey('Backspace');
    deleteLetter();
  } else if (e.key.length === 1 && /[A-Za-z]/.test(e.key)) {
    highlightKey(e.key.toUpperCase());
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
  if (msg && !gameWon && !gameLost) {
    setTimeout(() => {
      if (messageEl.textContent === msg) {
        messageEl.textContent = '';
      }
    }, 2000);
  }
}

// Update share button visibility
function updateShareButton() {
  if (gameWon || gameLost) {
    shareContainer.style.display = 'block';
    shareButton.style.display = 'block';
  } else {
    shareContainer.style.display = 'none';
  }
}

// Generate share text
function generateShareText() {
  const result = gameWon ? `${attempt}/5` : 'X/5';
  let shareText = `spencergreene.com/wordle ${currentDate} ${result}\n\n`;
  
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
  
  return shareText;
}

// Share result using Web Share API
async function shareResult() {
  if (!gameWon && !gameLost) return;
  
  const shareText = generateShareText();
  
  if (navigator.share) {
    try {
      await navigator.share({
        text: shareText
      });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Error sharing:', error);
      return;
    }
  }
  // Fallback if no Web Share API
  try {
    await navigator.clipboard.writeText(shareText);
    showMessage('Result copied to clipboard!');
    setTimeout(() => {
      if (messageEl.textContent === 'Result copied to clipboard!') {
        messageEl.textContent = '';
      }
    }, 2000);
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    showMessage('Failed to copy. Please try again.');
  }
}

// Generate date buttons for last 7 days
function generateDateButtons() {
  dateButtons.innerHTML = '';
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const button = document.createElement('button');
    button.className = 'date-button';
    button.textContent = formatDate(date);
    
    if (dateStr === currentDate) {
      button.classList.add('active');
    }
    
    button.addEventListener('click', () => {
      currentDate = dateStr;
      loadGame();
      generateDateButtons(); // Update active state
      dateMenu.style.display = 'none';
    });
    
    dateButtons.appendChild(button);
  }
}

// Format date for display
function formatDate(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  if (isToday) {
    return 'Today';
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}



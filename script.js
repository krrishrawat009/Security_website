// your code goes here
// Binary Tree Node
class TreeNode {
  constructor(char, code) {
      this.char = char;
      this.code = code;
      this.left = null;
      this.right = null;
  }
}

// Binary Tree for character mapping
class BinaryTree {
  constructor() {
      this.root = null;
  }

  insert(char, code) {
      this.root = this._insertRec(this.root, char, code);
  }

  _insertRec(node, char, code) {
      if (node === null) {
          return new TreeNode(char, code);
      }

      if (code < node.code) {
          node.left = this._insertRec(node.left, char, code);
      } else if (code > node.code) {
          node.right = this._insertRec(node.right, char, code);
      }

      return node;
  }

  search(code) {
      return this._searchRec(this.root, code);
  }

  _searchRec(node, code) {
      if (node === null || node.code === code) {
          return node;
      }

      if (code < node.code) {
          return this._searchRec(node.left, code);
      }

      return this._searchRec(node.right, code);
  }
}

const CHAR_SET = " `~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let CHARS = Array.from(CHAR_SET);
let KEY = shuffleArray(Array.from(CHAR_SET));

// Create binary trees and hashmaps for encryption and decryption
let encryptTree = new BinaryTree();
let decryptTree = new BinaryTree();
let encryptMap = new Map();
let decryptMap = new Map();

// Initialize the data structures
function initializeDataStructures() {
  for (let i = 0; i < CHARS.length; i++) {
      encryptTree.insert(CHARS[i], i);
      decryptTree.insert(KEY[i], i);
      encryptMap.set(CHARS[i], KEY[i]);
      decryptMap.set(KEY[i], CHARS[i]);
  }
}

// Shuffle function for generating the cipher key
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  // Swap
  }
  return array;
}

// Encrypt function
function encrypt() {
  let text = document.getElementById('inputText').value;
  let cipherText = text.split('').map(char => {
      return encryptMap.get(char) || char;
  }).join('');
  
  document.getElementById('outputText').value = cipherText;
  highlightOutput();
  flashButton('encrypt');
}

// Decrypt function
function decrypt() {
  let text = document.getElementById('inputText').value;
  let plainText = text.split('').map(char => {
      return decryptMap.get(char) || char;
  }).join('');
  
  document.getElementById('outputText').value = plainText;
  highlightOutput();
  flashButton('decrypt');
}

// Highlight output box momentarily
function highlightOutput() {
  let outputArea = document.getElementById('outputText');
  outputArea.style.backgroundColor = '#ffa41c';
  setTimeout(() => {
      outputArea.style.backgroundColor = '#333';
  }, 500);
}

// Flash the clicked button to provide visual feedback
function flashButton(action) {
  let button = document.querySelector(`button[onclick="${action}()"]`);
  button.style.backgroundColor = '#00ff00';
  setTimeout(() => {
      button.style.backgroundColor = '#ffa41c';
  }, 300);
}

// Function to update the current date and time dynamically
function updateDateTime() {
  const dateTimeElement = document.getElementById('datetime');
  const now = new Date();
  const formattedDateTime = now.toLocaleString();
  dateTimeElement.textContent = `Current Date and Time: ${formattedDateTime}`;
  setTimeout(updateDateTime, 1000);
}

// Initialize data structures and start the clock
initializeDataStructures();
updateDateTime();
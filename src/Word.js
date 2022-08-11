const WORD_URL = 'https://raw.githubusercontent.com/3b1b/videos/master/_2022/wordle/data/possible_words.txt';
const ALLOWED_WORDS_URL = 'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words';

export const initialBoard = new Array(6).fill("").map(()=>Array(5).fill(""))

export const fetchWords = async() => {
    let solution;
    let wordSet;
    const response = await fetch(WORD_URL)
    const words = await response.text()
    const wordArr = words.split("\n")
    solution = wordArr[Math.floor(Math.random() * wordArr.length)];
    wordSet = new Set(wordArr)

    return {solution, wordSet};
  }

export const fetchAllowedWords = async() => {
    let wordSet;
    const response = await fetch(ALLOWED_WORDS_URL)
    const words = await response.text()
    const wordArr = words.split("\n")
    wordSet = new Set(wordArr)
    return wordSet;
  }
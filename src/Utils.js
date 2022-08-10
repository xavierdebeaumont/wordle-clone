const API_URL = 'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words';

export const initialBoard = new Array(6).fill("").map(()=>Array(5).fill(""))

export const fetchWords = async() => {
    let solution;
    let wordSet;
    const response = await fetch(API_URL)
    const words = await response.text()
    const wordArr = words.split("\n")
    solution = wordArr[Math.floor(Math.random() * wordArr.length)];
    wordSet = new Set(wordArr)

    return {solution, wordSet}
  }
const information = (x) => {
  return x > 0 ? -Math.log2(x) : 0;
};

const entropy = (probPattern) => {
  const result = 0;
  for (let i; i < probPattern.length; i++) {
    result = probPattern[i] * information(probPattern[i]);
  }
  return result;
};

const wordsToInt = (words) => {
  const array = [];
  words.forEach((word) => {
    [...word].forEach((letter) => {
      array.push(letter.charCodeAt(0));
    });
  });
  return array;
};

function generateTernaryList() {
  let ternaryList = [];
  let num = 0;
  for (let i = 0; i < 243; i++) {
    num = i;
    let str = num.toString(3);
    if (str.length < 5) {
      for (let i = str.length; i < 5; i++) {
        str += "0";
      }
    }
    ternaryList.push(str);
  }
  return ternaryList;
}

const generateNewPossibleWords = (word, pattern, possibleWords) => {
  let newPossibleWords = possibleWords;
  if (word !== undefined) {
    [...pattern].forEach((pattern, i) => {
      if (pattern === "0") {
        newPossibleWords = newPossibleWords.filter(
          (possibleWord) => !possibleWord.includes(word[i])
        );
      } else if (pattern === "1") {
        newPossibleWords = newPossibleWords.filter((possibleWord) =>
          possibleWord.includes(word[i])
        );
      } else if (pattern === "2") {
        newPossibleWords = newPossibleWords.filter(
          (possibleWord) => possibleWord.charAt(i) === word.charAt(i)
        );
      }
    });
  }
  return newPossibleWords;
};

export const generatePatternDictionary = (allowedWordSet) => {
  let patternDictionary = {};
  let wordInformation = {};
  let ternaryList = generateTernaryList();

  allowedWordSet.forEach((word) => {
    for (let i = 0; i < 243; i++) {
      if (patternDictionary[word] === undefined) {
        patternDictionary[word] = {};
      }
      patternDictionary[word][ternaryList[i]] = generateNewPossibleWords(
        word,
        ternaryList[i],
        allowedWordSet
      );
    }
  });
  if (patternDictionary !== undefined) {
    for (const [word, patternList] of Object.entries(patternDictionary)) {
      let entropy = 0;
      for (const [patternName, pattern] of Object.entries(patternList)) {
        if (wordInformation[word] === undefined) {
          wordInformation[word] = {};
        }
        entropy +=
          (pattern.length / allowedWordSet.length) *
          information(pattern.length / allowedWordSet.length);
      }
      wordInformation[word] = entropy;
    }
  }
  return {patternDictionary, wordInformation};
};

export const bestMoves = (wordInformation) => {
  let bestWord;
  let bestInfo = 0;
  for (const [wordName, information] of Object.entries(wordInformation)) {
    if (information > bestInfo) {
      bestWord = wordName;
      bestInfo = information;
    }
  }
  return {bestWord, bestInfo};
};

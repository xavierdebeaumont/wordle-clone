const information = (x) => {
  return x > 0 ? -Math.log2(x) : 0;
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

export const generatePatternDistribution = (allowedWordSet) => {
  let patternDistribution = {};
  let ternaryList = generateTernaryList();
  allowedWordSet.forEach(word => {
    for(let i=0; i<243 ;i++){
        generateNewPossibleWords(word, ternaryList[i], allowedWordSet);
    }
  })
};

const entropy = (probPattern) => {
  const result = 0;
  for (let i; i < probPattern.length; i++) {
    result = probPattern[i] * information(probPattern[i]);
  }
  return result;
};

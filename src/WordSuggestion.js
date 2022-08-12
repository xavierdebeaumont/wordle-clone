const information = (x) => {
  return x > 0 ? -Math.log2(x) : 0;
};

const probability = (possibleWords) => {};

const entropy = (probPattern) => {
  const result = 0;
  for (let i; i < probPattern.length; i++) {
    result = probPattern[i] * information(probPattern[i]);
  }
  return result;
};

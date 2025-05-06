const RandomNumber = (int, max) => {
  if (int === 'random') {
    const number = Math.floor(Math.random() * (max - -max + 1)) + -max;

    if (number < 0) {
      return `(${number})`;
    } else {
      return number;
    }
  }

  if (int === 'positive') {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
  }

  if (int === 'negative') {
    return `(${Math.floor(Math.random() * (-1 - -max + 1) + -max)})`;
  }
};

export { RandomNumber };

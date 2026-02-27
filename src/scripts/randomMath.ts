export const RandomMath = (size: number, max: number, int: 'random' | 'positive' | 'negative', type: Array<string>) => {
  const numbers: (number | string)[] = [];
  const opcoes: string[] = [];
  const types = new Map<string, string>([
    ['soma', '+'],
    ['subt', '-'],
    ['mult', '*'],
    ['divi', '/'],
  ]);

  for (let i = 0; i <= type.length; i++) {
    if (types.has(type[i])) {
      const operator = types.get(type[i]);
      if (operator !== undefined) {
        opcoes.push(operator);
      }
    }
  }

  for (var i = 0; i < size; i++) {
    if (int === 'random') {
      const number = Math.floor(Math.random() * (max - -max + 1)) + -max;

      if (number < 0) {
        numbers.push(`(${number})`);
      } else {
        numbers.push(number);
      }
    }

    if (int === 'positive') {
      numbers.push(Math.floor(Math.random() * (max - 1 + 1)) + 1);
    }

    if (int === 'negative') {
      numbers.push(`(${Math.floor(Math.random() * (-1 - -max + 1) + -max)})`);
    }

    const sorteio = opcoes[Math.floor(Math.random() * opcoes.length)];

    if (i != size - 1) {
      numbers.push(sorteio);
    }
  }

  return numbers;
};

console.log(RandomMath(10, 100, 'positive', ['subt', 'soma', 'mult', 'divi']));

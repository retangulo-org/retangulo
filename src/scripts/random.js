function Random(size, maximo, type) {
  const numbers = [];

  for (var i = 0; i < size; i++) {
    if (type === 'raiz2') {
      numbers.push(Math.floor(Math.random() * (maximo - 1 + 1)) + 1);
    }

    if (type === 'random') {
      numbers.push(Math.floor(Math.random() * (maximo - -maximo + 1)) + -maximo);
    }

    if (type === 'positive') {
      numbers.push(Math.floor(Math.random() * (maximo - 1 + 1)) + 1);
    }

    if (type === 'negative') {
      numbers.push(Math.floor(Math.random() * (-1 - -100 + 1) + -100));
    }

    const opcoes = ['+', '-', '*'];

    const sorteada = opcoes[Math.floor(Math.random() * opcoes.length)];

    if (i != size - 1) {
      numbers.push(sorteada);
    }
  }

  return numbers;
}

const array = Random(10, 100, 'positive');

function Eval() {
  return eval(array.join(''));
}

const RandomInit = Random(10, 100, 'positive');

console.log(RandomInit);
console.log(eval(RandomInit.join('')));

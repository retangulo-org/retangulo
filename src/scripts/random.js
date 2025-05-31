/**
 * @param {number} size - numero maximo de calculos
 * @param {number} max - numero maximo gerado
 * @param {number} int - negativo, positivo ou random
 * @param {string} type - tipo da geração
 * @return {obj} retorna uma array do calculo gerado
 */
export const RandomMath = (size, max, int, type) => {
  const numbers = [];

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

    const opcoes = [];

    switch (type) {
      case 'soma':
        opcoes.push('+');
        break;
      case 'subt':
        opcoes.push('-');
        break;
      case 'mult':
        opcoes.push('*');
        break;
      case 'divi':
        opcoes.push('/');
        break;
      default:
        break;
    };

    const sorteio = opcoes[Math.floor(Math.random() * opcoes.length)];

    if (i != size - 1) {
      numbers.push(sorteio);
    }
  }

  return numbers;
};

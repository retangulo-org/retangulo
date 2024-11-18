const RandomNumber = (tipo, negativo, maximo) => {
  if (tipo === 'raiz2') {
    return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
  }

  if (negativo === 'random-negative') {
    return Math.floor(Math.random() * (maximo - -maximo + 1)) + -maximo;
  }

  if (negativo === 'only-positive') {
    return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
  }

  return Math.floor(Math.random() * (-1 - (-100) + 1) + (-100));
};

export { RandomNumber };

const RandomNumber = (tipo, negativo, maximo) => {
  if (Number.isInteger(maximo) == false) {
    return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
  }

  if (tipo === 'raiz2') {
    return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
  }

  if (negativo === 'true') {
    return Math.floor(Math.random() * (maximo - -maximo + 1)) + -maximo;
  }

  return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
};

export { RandomNumber };

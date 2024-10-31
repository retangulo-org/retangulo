const RandomNumber = (tipo, negativo, maximo) => {
  if (tipo === 'raiz2') {
    return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
  }

  if (negativo === 'true') {
    console.log('RandomNumber negativo');
    return Math.floor(Math.random() * (maximo - -maximo + 1)) + -maximo;
  }

  return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
};

export { RandomNumber };

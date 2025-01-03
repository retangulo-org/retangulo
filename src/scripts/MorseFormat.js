import { retmorse } from 'retmorse';

const MorseFormat = (tipo, string, anterior) => {
  const morseContainer = {
    string: undefined,
    result: undefined,
    anterior: undefined,
  };

  switch (tipo) {
    case 'toTxt':
      morseContainer.string = retmorse.toMorse(string);
      morseContainer.result = string;
      morseContainer.anterior = `${anterior.n1} = ${anterior.n2}`;
      morseContainer.texto = 'Espaços extras causarão erro.';
      break;
    case 'toMorse':
      morseContainer.string = string;
      morseContainer.result = retmorse.toMorse(string);
      morseContainer.anterior = `${anterior.n1} = ${anterior.n2}`;
      morseContainer.texto = 'Espaços extras causarão erro.';
      break;
  }

  return morseContainer;
};

export { MorseFormat };

import { StringNegativeFormat } from './StringNegativeFormat.js';

const Calc = (tipo, math, stored) => {
  const mathContainer = {
    string: undefined,
    result: undefined,
    anterior: undefined,
  };

  switch (tipo) {
    case 'soma':
      mathContainer.result = math.n1 + math.n2;
      mathContainer.string = `${StringNegativeFormat(math.n1)} + ${StringNegativeFormat(math.n2)}`;
      mathContainer.anterior = `${stored.n1} + ${stored.n2} = ${stored.n3}`;
      break;
    case 'subt':
      mathContainer.result = math.n1 - math.n2;
      mathContainer.string = `${StringNegativeFormat(math.n1)} - ${StringNegativeFormat(math.n2)}`;
      mathContainer.anterior = `${stored.n1} - ${stored.n2} = ${stored.n3}`;
      break;
    case 'mult':
      mathContainer.result = math.n1 * math.n2;
      mathContainer.string = `${StringNegativeFormat(math.n1)} × ${StringNegativeFormat(math.n2)}`;
      mathContainer.anterior = `${stored.n1} × ${stored.n2} = ${stored.n3}`;
      break;
    case 'divi':
      mathContainer.result = Number.isInteger(math.n1 / math.n2) ? math.n1 / math.n2 : (math.n1 / math.n2).toFixed(2);
      mathContainer.string = `${StringNegativeFormat(math.n1)} ÷ ${StringNegativeFormat(math.n2)}`;
      mathContainer.anterior = `${stored.n1} ÷ ${stored.n2} = ${stored.n3}`;
      mathContainer.texto =
        'Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: 3÷2 = 1.5, 8÷3 = 2.67';
      break;
    case 'raiz2':
      mathContainer.result = Number.isInteger(Math.sqrt(math.n1)) ? Math.sqrt(math.n1) : Math.sqrt(math.n1).toFixed(2);
      mathContainer.string = `√${math.n1}`;
      mathContainer.anterior = `√${stored.n1} = ${stored.n3}`;
      mathContainer.texto =
        'Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: √5 = 2.24, √10 = 3.16. Esse modo pode ter contas erradas!';
      break;
    case 'expo2':
      mathContainer.result = math.n1 * math.n1;
      mathContainer.string = `${StringNegativeFormat(math.n1)}²`;
      mathContainer.anterior = `${stored.n1}² = ${stored.n3}`;
      break;
    case 'expo3':
      mathContainer.result = math.n2 * math.n2 * math.n2;
      mathContainer.string = `${StringNegativeFormat(math.n2)}³`;
      mathContainer.anterior = `${stored.n2}³ = ${stored.n3}`;
      break;
    case 'maior':
      mathContainer.result = math.n1 > math.n2 ? 'verdadeiro' : 'falso';
      mathContainer.string = `${math.n1} > ${math.n2}`;
      mathContainer.anterior = `${stored.n1} > ${stored.n2} = ${stored.n3}`;
      break;
    case 'menor':
      mathContainer.result = math.n1 < math.n2 ? 'verdadeiro' : 'falso';
      mathContainer.string = `${math.n1} < ${math.n2}`;
      mathContainer.anterior = `${stored.n1} < ${stored.n2} = ${stored.n3}`;
      break;
  }

  return mathContainer;
};

export { Calc };

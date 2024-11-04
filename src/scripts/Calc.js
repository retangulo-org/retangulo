import { StringNegativeFormat } from './StringNegativeFormat.js';

const Calc = (tipo, math, stored) => {
  const calcContainer = new Object();

  switch (tipo) {
    case 'soma':
      calcContainer.calculo = math.n1 + math.n2;
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)} + ${StringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${stored.n1} + ${stored.n2} = ${stored.n3}`;
      break;
    case 'subt':
      calcContainer.calculo = math.n1 - math.n2;
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)} - ${StringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${stored.n1} - ${stored.n2} = ${stored.n3}`;
      break;
    case 'mult':
      calcContainer.calculo = math.n1 * math.n2;
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)} × ${StringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${stored.n1} × ${stored.n2} = ${stored.n3}`;
      break;
    case 'divi':
      calcContainer.calculo = Number.isInteger(math.n1 / math.n2) ? math.n1 / math.n2 : (math.n1 / math.n2).toFixed(2);
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)} ÷ ${StringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${stored.n1} ÷ ${stored.n2} = ${stored.n3}`;
      calcContainer.texto =
        'Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: 3÷2 = 1.5, 8÷3 = 2.67';
      break;
    case 'raiz2':
      calcContainer.calculo = Number.isInteger(Math.sqrt(math.n1)) ? Math.sqrt(math.n1) : Math.sqrt(math.n1).toFixed(2);
      calcContainer.calculoString = `√${math.n1}`;
      calcContainer.anterior = `√${stored.n1} = ${stored.n3}`;
      calcContainer.texto =
        'Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: √5 = 2.24, √10 = 3.16. Esse modo pode ter contas erradas!';
      break;
    case 'expo2':
      calcContainer.calculo = math.n1 * math.n1;
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)}²`;
      calcContainer.anterior = `${stored.n1}² = ${stored.n3}`;
      break;
    case 'expo3':
      calcContainer.calculo = math.n2 * math.n2 * math.n2;
      calcContainer.calculoString = `${StringNegativeFormat(math.n2)}³`;
      calcContainer.anterior = `${stored.n2}³ = ${stored.n3}`;
      break;
    case 'maior':
      calcContainer.calculo = math.n1 > math.n2 ? 'maior' : 'menor';
      calcContainer.calculoString = `${math.n1} > ${math.n2}`;
      calcContainer.anterior = `${stored.n1} > ${stored.n2} = ${stored.n3}`;
      break;
    case 'menor':
      calcContainer.calculo = math.n1 < math.n2 ? 'menor' : 'maior';
      calcContainer.calculoString = `${math.n1} < ${math.n2}`;
      calcContainer.anterior = `${stored.n1} < ${stored.n2} = ${stored.n3}`;
      break;
  }

  return calcContainer;
};

export { Calc };

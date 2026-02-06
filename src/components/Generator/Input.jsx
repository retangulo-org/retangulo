import { useContext, useEffect } from 'react';
import InputCalc from '../InputCalc';
import { RootContext } from './Root';

export default function input() {
  const { input, setInput, color } = useContext(RootContext);

  // TODO: mudar isso mds
  useEffect(() => {
    const valor = localStorage.getItem('keyType');

    if (valor === null || valor === '') {
      localStorage.setItem('keyType', 'number');
    }
  }, []);

  return (
    <InputCalc
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Digite o resultado"
      required={false}
      autoFocus={false}
      type={localStorage.getItem('keyType') === 'number' ? 'number' : 'text'}
      inputMode={localStorage.getItem('keyType') === 'number' ? 'decimal' : 'text'}
      color={color}
      step={'any'}
    />
  );
}

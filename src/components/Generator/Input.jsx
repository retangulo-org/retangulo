import { useContext } from 'react';
import InputCalc from '../InputCalc';
import { RootContext } from './Root';

export default function input() {
  const { input, setInput, color } = useContext(RootContext);

  return (
    <InputCalc
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Resultado…"
      required={false}
      autoFocus={false}
      type={localStorage.getItem('keyType') === 'number' ? 'number' : 'text'}
      inputMode={localStorage.getItem('keyType') === 'number' ? 'decimal' : 'text'}
      color={color}
      step={'any'}
    />
  );
}

import { useContext } from 'react';
import InputCalc from '../InputCalc';
import { RootContext } from './Root';

export default function input({ notNumber }) {
  const { input, setInput, color } = useContext(RootContext);

  return (
    <InputCalc
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Resultado..."
      required={false}
      autoFocus={false}
      type={notNumber ? 'text' : 'number'}
      inputMode={notNumber ? 'text' : 'numeric'}
      color={color}
      step={'any'}
    />
  );
}

import { useContext } from 'react';
import InputCalc from '../InputCalc';
import { RootContext } from './Root';

export default function input() {
  const { input, setInput, color } = useContext(RootContext);

  return (
    <InputCalc
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Resultado..."
      required={false}
      autoFocus={false}
      type={'number'}
      inputMode={'numeric'}
      color={color}
      step={'any'}
    />
  );
}

import React, {useState} from 'react';
import InputCalc from '../InputCalc';

export default function Input({children}) {
  const [input, setInput] = useState('');

  return (
    <InputCalc
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Resultado..."
      required={false}
      autoFocus={false}
      type={'number'}
      inputMode={'numeric'}
      color={'red'}
    />
  );
}
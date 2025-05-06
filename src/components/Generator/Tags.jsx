import React, { useContext } from 'react';
import { RootContext } from './Root';
import Tag from '../Tag';

export default function Tags() {
  const { correct, wrong, seconds } = useContext(RootContext);

  return (
    <div className="w-full flex flex-row gap-2 mb-2 justify-center flex-wrap">
      <Tag text={correct} type="pontos" />
      <Tag text={seconds} type="time" />
      <Tag text={wrong} type="erros" />
    </div>
  );
}

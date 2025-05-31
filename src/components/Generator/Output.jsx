import { useContext } from 'react';
import { RootContext } from './Root';

export default function Output() {
  const { output, result } = useContext(RootContext);

  return (
    <h1 className="my-6 p-0 text-center font-mono tracking-[0.1rem]">
      {output}
      {/* <br />
      <div className="text-neutral-500 text-base">{result}</div> */}
    </h1>
  );
}

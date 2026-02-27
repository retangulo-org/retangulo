import { useContext } from 'react';
import { RootContext } from './Root';

export default function Output() {
  const { output }: any = useContext(RootContext);

  return <h1 className="my-6 text-5xl p-0 text-center text-wrap break-all font-mono tracking-[0.1rem]">{output}</h1>;
}

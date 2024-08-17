import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [input, setInput] = useState(100);
  const [negativo, setNegativo] = useState(false);

  function LinkButton({ text, type }) {
    return (
      <Link
        to="/play"
        state={{ type: type, negativo: negativo, maximo: input }}
        className="w-full h-14 flex justify-center items-center text-white rounded-lg bg-blue-500 hover:bg-blue-800 active:bg-blue-700"
      >
        {text}
      </Link>
    );
  }

  function Negativo() {
    return (
      <button onClick={() => setNegativo(!negativo)}>
        Números negativos: {String(negativo)}
      </button>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-5 gap-4">
        Valor máximo:
        <input
          className="w-full h-20 rounded-lg border-4 text-center text-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          inputMode="numeric"
        />
        <Negativo />
        <LinkButton text="Soma" type="soma" />
        <LinkButton text="Subtração" type="subt" />
        <LinkButton text="Multiplicação" type="mult" />
        <LinkButton text="Divisão" type="divi" />
        <LinkButton text="Raiz Quadrada" type="raiz2" />
        <LinkButton text="Expoente 2" type="expo2" />
        <LinkButton text="Expoente 3" type="expo3" />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const [size, setSize] = useState(() => {
    return localStorage.getItem("calcSize") || 100;
  });
  const [negative, setNegative] = useState(() => {
    const storedValue = localStorage.getItem("isNegative");
    return storedValue === "true";
  });

  useEffect(() => {
    localStorage.setItem("isNegative", negative.toString());
    localStorage.setItem("calcSize", size);
  }, [negative, size]);

  const calcSize = (event) => {
    localStorage.setItem("calcSize", event.target.value);

    setSize(event.target.value);
  };

  function Negative() {
    const toggleChecked = () => {
      setNegative((prevState) => !prevState);
    };

    return (
      <>
        <button
          onClick={toggleChecked}
          className="flex flex-row gap-2 justify-between items-center w-full h-12 p-3 bg-slate-200 rounded-md cursor-pointer"
        >
          Números negativos
          <i
            className={
              negative
                ? "fa-solid fa-toggle-on text-2xl"
                : "fa-solid fa-toggle-off text-2xl"
            }
          ></i>
        </button>
      </>
    );
  }

  function LinkButton({ text, type }) {
    return (
      <Link
        to="/play"
        state={{ type: type, negativo: negative, maximo: size }}
        className="w-full h-14 flex justify-center items-center text-white rounded-lg bg-blue-500 hover:bg-blue-800 active:bg-blue-700"
      >
        {text}
      </Link>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-5 gap-4">
        Valor máximo:
        <input
          className="w-full h-20 rounded-lg border-4 text-center text-xl"
          value={size}
          onChange={calcSize}
          type="number"
          inputMode="numeric"
        />
        <Negative />
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

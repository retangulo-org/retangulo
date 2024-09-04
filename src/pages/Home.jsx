import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { InputSizeCalc } from "../components/Input";

export default function Home() {
  const [calcSizeInputValue, setCalcSizeInputValue] = useState(() => {
    return localStorage.getItem("calcSizeValue") || 100;
  });
  const [negative, setNegative] = useState(() => {
    const storedValue = localStorage.getItem("isNegative");
    return storedValue === "true";
  });

  useEffect(() => {
    localStorage.setItem("isNegative", negative.toString());
    localStorage.setItem("calcSizeValue", calcSizeInputValue);
  }, [negative, calcSizeInputValue]);

  const calcSizeStorage = (event) => {
    localStorage.setItem("calcSizeValue", event.target.value);

    setCalcSizeInputValue(event.target.value);
  };

  function Negative() {
    const toggleChecked = () => {
      setNegative((prevState) => !prevState);
    };

    return (
      <>
        <button
          onClick={toggleChecked}
          className="flex flex-row gap-2 justify-between items-center w-full h-14 p-3 bg-slate-200 rounded-md cursor-pointer transition-all ease-in-out delay-150"
        >
          Números negativos
          <i
            className={`fa-solid text-3xl transition-all ease-in-out delay-200 ${
              negative
                ? "fa-toggle-on text-green-500"
                : "fa-toggle-off text-red-500"
            }`}
          ></i>
        </button>
      </>
    );
  }

  function LinkCalc({ text, type }) {
    const inputIsEmpty = (event) => {
      if (calcSizeInputValue.trim() === "") {
        event.preventDefault();
        alert("Preencha o campo antes de continuar.");
      }
    };

    return (
      <Link
        to="/play"
        state={{ type: type, negativo: negative, maximo: calcSizeInputValue }}
        onClick={inputIsEmpty}
        className="w-full h-14 flex justify-center items-center text-white rounded-lg bg-blue-500 hover:bg-blue-800 active:bg-blue-700"
      >
        {text}
      </Link>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <InputSizeCalc value={calcSizeInputValue} onChange={calcSizeStorage} />
        <Negative />
        <LinkCalc text="Soma" type="soma" />
        <LinkCalc text="Subtração" type="subt" />
        <LinkCalc text="Multiplicação" type="mult" />
        <LinkCalc text="Divisão" type="divi" />
        <LinkCalc text="Raiz Quadrada" type="raiz2" />
        <LinkCalc text="Expoente 2" type="expo2" />
        <LinkCalc text="Expoente 3" type="expo3" />
      </div>
    </>
  );
}

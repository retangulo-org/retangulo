import { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { InputSizeCalc } from "../components/Input";

export default function Home() {
  const [calcSizeInputValue, setCalcSizeInputValue] = useState(100);
  const [negative, setNegative] = useState(false);

  function Negative() {
    const toggleChecked = () => {
      setNegative(!negative);
      console.log(negative)
    };

    return (
      <>
        <button
          onClick={toggleChecked}
          className={`flex flex-row gap-2 justify-between items-center w-full h-14 p-3 text-white rounded-md cursor-pointer hover:font-bold select-none ${
            negative
              ? "bg-green-800 hover:bg-green-900"
              : "bg-red-800 hover:bg-red-900"
          }`}
        >
          Números negativos
          <i
            className={`fa-solid text-3xl ${
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
        to={`/play/${type}/${negative}/${calcSizeInputValue}`}
        onClick={inputIsEmpty}
        className="w-full h-14 flex justify-center items-center text-white rounded-lg hover:font-bold bg-blue-500 hover:bg-blue-800 active:bg-blue-700 select-none"
      >
        {text}
      </Link>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <InputSizeCalc
          value={calcSizeInputValue}
          onChange={(e) => setCalcSizeInputValue(e.target.value)}
        />
        <Negative />
        <hr className="border-t-black/20 dark:border-t-white/20 border-1 w-full" />
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

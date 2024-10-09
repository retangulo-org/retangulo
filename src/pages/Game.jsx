import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { InputSizeCalc } from "../components/Input";

export default function Game() {
  const [calcSizeInputValue, setCalcSizeInputValue] = useState(100);
  const [negative, setNegative] = useState(false);
  const [timeLimit, setTimeLimit] = useState("1m");

  const navigate = useNavigate();

  function TimerSelect() {
    const handleChange = (event) => {
      setTimeLimit(event.target.value);
    };

    return (
      <select
        className="appearance-none w-full h-14 p-3 rounded-md cursor-pointer text-white hover:font-bold bg-orange-500 hover:bg-orange-600 text-center after:fa-solid after:fa-clock"
        value={timeLimit}
        onChange={handleChange}
      >
        <option value="30s">30 segundos</option>
        <option value="1m">1 minuto</option>
        <option value="5m">5 minutos</option>
        <option value="10m">10 minutos</option>
        <option value="30m">30 minutos</option>
        <option value="infinito">Sem limite</option>
      </select>
    );
  }

  function Negative() {
    const toggleChecked = () => {
      setNegative(!negative);
    };

    return (
      <>
        <button
          onClick={toggleChecked}
          className={`flex flex-row gap-2 justify-between items-center w-full h-14 p-3 text-white rounded-md cursor-pointer hover:font-bold select-none ${
            negative
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Números negativos
          <i
            className={`fa-solid text-3xl ${
              negative
                ? "fa-toggle-on text-green-900"
                : "fa-toggle-off text-red-900"
            }`}
          ></i>
        </button>
      </>
    );
  }

  function LinkCalc({ text, type }) {
    const inputIsEmpty = () => {
      if (calcSizeInputValue === "") {
        return alert("Preencha o campo antes de continuar.");
      }

      return navigate(
        `/${type}/${timeLimit}/${negative}/${calcSizeInputValue}`
      );
    };

    return (
      <button
        onClick={() => {
          inputIsEmpty();
        }}
        className="w-full h-14 flex justify-center items-center text-white rounded-lg hover:font-bold bg-blue-600 hover:bg-blue-800 active:bg-blue-700 select-none"
      >
        {text}
      </button>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <InputSizeCalc
          value={calcSizeInputValue}
          onChange={(e) => setCalcSizeInputValue(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <Negative />
          <TimerSelect />
        </div>
        <hr className="border-t-black/40 dark:border-t-white/40 border-1 w-full" />
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <LinkCalc text="Soma" type="soma" />
          <LinkCalc text="Subtração" type="subt" />
          <LinkCalc text="Multiplicação" type="mult" />
          <LinkCalc text="Divisão" type="divi" />
          <LinkCalc text="Raiz Quadrada" type="raiz2" />
          <LinkCalc text="Expoente 2" type="expo2" />
          <LinkCalc text="Expoente 3" type="expo3" />
        </div>
      </div>
    </>
  );
}

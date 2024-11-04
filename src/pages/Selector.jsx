import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Input from '../components/Input';

export default function Selector() {
  const [calcSizeInputValue, setCalcSizeInputValue] = useState(() => {
    return localStorage.getItem('calcSizeValue') || 100;
  });

  const [calcNegative, setCalcNegative] = useState(() => {
    return localStorage.getItem('calcNegative') == 'true' ? 'true' : false || false;
  });

  const [calcMode, setCalcMode] = useState(() => {
    return localStorage.getItem('modeValue') || 'speedrun';
  });

  const [speedInputValue, setSpeedInputValue] = useState(() => {
    return localStorage.getItem('speedValue') || 10;
  });

  const [calcTime, setCalcTime] = useState(() => {
    return localStorage.getItem('timerValue') || '1m';
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('calcSizeValue', Number(calcSizeInputValue));
    localStorage.setItem('calcNegative', calcNegative);
    localStorage.setItem('modeValue', calcMode.toString());
    localStorage.setItem('speedValue', Number(speedInputValue));
    localStorage.setItem('timerValue', calcTime.toString());
  }, [calcNegative, calcSizeInputValue, calcMode, speedInputValue, calcTime]);

  const calcSizeStorage = (event) => {
    localStorage.setItem('calcSizeValue', event.target.value);

    setCalcSizeInputValue(event.target.value);
  };

  const calcSpeedStorage = (event) => {
    localStorage.setItem('speedValue', event.target.value);

    setSpeedInputValue(event.target.value);
  };

  const CalcModeToggle = () => {
    let handleChange = (event) => {
      setCalcMode(event.target.value);
    };

    return (
      <select
        className="appearance-none w-full h-14 p-4 rounded-md cursor-pointer text-white hover:font-bold bg-blue-600 hover:bg-blue-700 text-center select-none"
        value={calcMode}
        onChange={handleChange}>
        <option value="speedrun">Número de acertos</option>
        <option value="timer">Tempo limite</option>
      </select>
    );
  };

  const CalcTimeToggle = () => {
    let handleChange = (event) => {
      setCalcTime(event.target.value);
    };

    return (
      <select
        className="appearance-none w-full h-14 p-4 rounded-md cursor-pointer text-white hover:font-bold bg-orange-500 hover:bg-orange-600 text-center select-none "
        value={calcTime}
        onChange={handleChange}>
        <option value="30s">30 segundos</option>
        <option value="1m">1 minuto</option>
        <option value="5m">5 minutos</option>
        <option value="10m">10 minutos</option>
        <option value="30m">30 minutos</option>
        <option value="infinito">Sem limite</option>
      </select>
    );
  };

  const CalcNegativeToggle = () => {
    const toggleChecked = () => {
      setCalcNegative(!calcNegative);
    };

    return (
      <>
        <button
          onClick={toggleChecked}
          className={`flex flex-row gap-2 justify-between items-center w-full h-14 p-4 text-white rounded-md cursor-pointer hover:font-bold select-none ${
            calcNegative ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
          }`}>
          Números negativos
          <i
            className={`fa-solid text-3xl ${
              calcNegative ? 'fa-toggle-on text-green-900' : 'fa-toggle-off text-red-900'
            }`}></i>
        </button>
      </>
    );
  };

  const LinkCalc = ({ text, type }) => {
    const inputIsEmpty = () => {
      if (calcSizeInputValue === '' || speedInputValue === '') {
        return alert('Preencha todos os campo antes de continuar.');
      }

      if (calcMode === 'timer') {
        return navigate(`/jogar/${type}/${calcMode}/${calcTime}/${calcNegative}/${calcSizeInputValue}`);
      }

      return navigate(`/jogar/${type}/${calcMode}/${speedInputValue}/${calcNegative}/${calcSizeInputValue}`);
    };

    return (
      <button
        onClick={() => {
          inputIsEmpty();
        }}
        className="w-full h-14 flex justify-center items-center text-white rounded-lg hover:font-bold bg-blue-600 hover:bg-blue-800 active:bg-blue-700 select-none">
        {text}
      </button>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <details className="w-full flex flex-col bg-neutral-200 dark:bg-neutral-800 rounded-md cursor-pointer">
        <summary className="p-4 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-md hover:font-bold select-none">
          Configuração da geração do cálculo
        </summary>
        <div className="mt-4 px-4 pb-4 space-y-4">
          <h4>Valor máximo:</h4>
          <Input value={calcSizeInputValue} onChange={calcSizeStorage} placeholder="Valor..." />
          <CalcNegativeToggle />
          <h4>Modos:</h4>
          <CalcModeToggle />
          {calcMode === 'timer' && (
            <>
              <h4>Tempo máximo:</h4>
              <CalcTimeToggle />
            </>
          )}
          {calcMode === 'speedrun' && (
            <>
              <h4>Número máximo de acertos:</h4>
              <Input value={speedInputValue} onChange={calcSpeedStorage} placeholder="Valor..." />
            </>
          )}
        </div>
      </details>
      <div className="w-full p-4 bg-neutral-200 dark:bg-neutral-800 rounded-md">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <LinkCalc text="Adição" type="soma" />
          <LinkCalc text="Subtração" type="subt" />
          <LinkCalc text="Multiplicação" type="mult" />
          <LinkCalc text="Divisão" type="divi" />
          <LinkCalc text="Raiz Quadrada" type="raiz2" />
          <LinkCalc text="Expoente 2" type="expo2" />
          <LinkCalc text="Expoente 3" type="expo3" />
          <LinkCalc text="Maior" type="maior" />
          <LinkCalc text="Menor" type="menor" />
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { ToggleRight, ToggleLeft } from 'lucide-react';
import { Collapse } from '../components/Collapse';

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
    localStorage.setItem('calcSizeValue', calcSizeInputValue.toString());
    localStorage.setItem('calcNegative', calcNegative.toString());
    localStorage.setItem('modeValue', calcMode.toString());
    localStorage.setItem('speedValue', speedInputValue.toString());
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
        className="appearance-none w-full h-12 rounded-sm cursor-pointer text-textAlt font-semibold bg-secundary text-center select-none"
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
        className="appearance-none w-full h-12 rounded-sm cursor-pointer text-textAlt font-semibold bg-secundary text-center select-none"
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
        <Button
          onClick={toggleChecked}
          className={`flex flex-row gap-2 justify-between items-center h-12 p-4 rounded-sm cursor-pointer font-semibold select-none`}>
          Números negativos
          {calcNegative ? (
            <ToggleRight className="w-10 h-10 text-neutral-100 dark:text-neutral-900" />
          ) : (
            <ToggleLeft className="w-10 h-10 text-primary text-neutral-600 dark:text-neutral-400" />
          )}
        </Button>
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
      <Button
        onClick={() => {
          inputIsEmpty();
        }}>
        {text}
      </Button>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Collapse.Root>
        <Collapse.Toggle>Configuração da geração do cálculo</Collapse.Toggle>
        <Collapse.Content className="flex flex-col gap-4">
          <h4>Valor máximo:</h4>
          <Input value={calcSizeInputValue} onChange={calcSizeStorage} placeholder="Valor..." type="number" />
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
              <Input value={speedInputValue} onChange={calcSpeedStorage} placeholder="Valor..." type="number" />
            </>
          )}
        </Collapse.Content>
      </Collapse.Root>
      <div className="w-full p-4 bg-foreground rounded-md">
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

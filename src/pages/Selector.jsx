import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { ChevronDown } from 'lucide-react';
import { Collapse } from '../components/Collapse';
import Transition from '../components/Transition';

export default function Selector() {
  const [calcSizeInputValue, setCalcSizeInputValue] = useState(() => {
    return localStorage.getItem('calcSizeValue') || 100;
  });

  const [calcNegative, setCalcNegative] = useState(() => {
    return localStorage.getItem('calcNegative') || 'only-positive';
  });

  const [calcMode, setCalcMode] = useState(() => {
    return localStorage.getItem('modeValue') || 'points';
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
      <div className="w-full relative flex flex-row justify-center items-center">
        <ChevronDown className="absolute right-4 text-textAlt pointer-events-none" />
        <select
          className="appearance-none actionDefault w-full h-12 rounded-sm cursor-pointer font-semibold text-center select-none"
          value={calcMode}
          onChange={handleChange}>
          <option value="points">Pontos</option>
          <option value="timer">Tempo</option>
        </select>
      </div>
    );
  };

  const CalcTimeToggle = () => {
    let handleChange = (event) => {
      setCalcTime(event.target.value);
    };

    return (
      <div className="w-full relative flex flex-row justify-center items-center">
        <ChevronDown className="absolute right-4 text-textAlt pointer-events-none" />
        <select
          className="appearance-none actionDefault w-full h-12 rounded-sm cursor-pointer font-semibold text-center select-none"
          value={calcTime}
          onChange={handleChange}>
          <option value="30s">30 segundos</option>
          <option value="1m">1 minuto</option>
          <option value="5m">5 minutos</option>
          <option value="10m">10 minutos</option>
          <option value="30m">30 minutos</option>
          <option value="infinito">Sem limite</option>
        </select>
      </div>
    );
  };

  const CalcNegativeToggle = () => {
    let handleChange = (event) => {
      setCalcNegative(event.target.value);
    };

    return (
      <div className="w-full relative flex flex-row justify-center items-center">
        <ChevronDown className="absolute right-4 text-textAlt pointer-events-none" />
        <select
          className="appearance-none actionDefault w-full h-12 rounded-sm cursor-pointer font-semibold text-center select-none"
          value={calcNegative}
          onChange={handleChange}>
          <option value="only-positive">Apenas positivo</option>
          <option value="random-negative">Aleatório</option>
          <option value="only-negative">Apenas negativo</option>
        </select>
      </div>
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
    <Transition className="flex flex-col justify-center items-center gap-4">
      <Collapse.Root>
        <Collapse.Toggle>Configuração do gerador</Collapse.Toggle>
        <Collapse.Content className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4>Valor máximo</h4>
            <Input value={calcSizeInputValue} onChange={calcSizeStorage} placeholder="Valor..." type="number" />
          </div>
          <div className="space-y-2">
            <h4>Positivo ou negativo</h4>
            <CalcNegativeToggle />
          </div>
          <div className="space-y-2">
            <h4>Modo</h4>
            <CalcModeToggle />
          </div>
          <div className="space-y-2">
            {calcMode === 'points' && (
              <>
                <h4>Pontuação máxima</h4>
                <Input value={speedInputValue} onChange={calcSpeedStorage} placeholder="Valor..." type="number" />
              </>
            )}
            {calcMode === 'timer' && (
              <>
                <h4>Tempo máximo</h4>
                <CalcTimeToggle />
              </>
            )}
          </div>
        </Collapse.Content>
      </Collapse.Root>
      <div className="w-full flex flex-col gap-4 text-center">
        <div className="w-full p-4 bg-foreground rounded-md space-y-4">
          <h4>Aritmética</h4>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <LinkCalc text="Adição" type="soma" />
            <LinkCalc text="Subtração" type="subt" />
            <LinkCalc text="Multiplicação" type="mult" />
            <LinkCalc text="Divisão" type="divi" />
          </div>
        </div>
        <div className="w-full p-4 bg-foreground rounded-md space-y-4">
          <h4>Potenciação</h4>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <LinkCalc text="Raiz Quadrada" type="raiz2" />
            <LinkCalc text="Expoente 2" type="expo2" />
            <LinkCalc text="Expoente 3" type="expo3" />
          </div>
        </div>
        <div className="w-full p-4 bg-foreground rounded-md space-y-4">
          <h4>Comparação</h4>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <LinkCalc text="Maior" type="maior" />
            <LinkCalc text="Menor" type="menor" />
          </div>
        </div>
      </div>
    </Transition>
  );
}

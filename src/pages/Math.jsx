import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { ChevronDown, Settings } from 'lucide-react';
import Transition from '../components/Transition';
import { Modal } from '../components/Modal';
import Return from '../components/Return';

export default function Math() {
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

  const [modal, setModal] = useState(false);

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
        return navigate(`/math/${type}/${calcMode}/${calcTime}/${calcNegative}/${calcSizeInputValue}`);
      }

      return navigate(`/math/${type}/${calcMode}/${speedInputValue}/${calcNegative}/${calcSizeInputValue}`);
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
      <Return text="Matemática" url="/" onClick={() => navigate("/")} />
      <ul className="w-full flex flex-row justify-center items-center rounded-md font-semibold select-none">
        <li
          className={`${calcMode === "points" ? "bg-primary text-neutral-100 cursor-default" : "text-text bg-foreground"} w-full h-12 flex justify-center items-center rounded-l-md text-center cursor-pointer`}
          onClick={() => setCalcMode('points')}
        >
          Pontuação
        </li>
        <li 
          className={`${calcMode === "timer" ? "bg-primary text-neutral-100 cursor-default" : "text-text bg-foreground"} w-full h-12 flex justify-center items-center rounded-r-md text-center cursor-pointer`}
          onClick={() => setCalcMode('timer')}
        >
          Tempo
        </li>
      </ul>
      <Button variant="primary" onClick={() => setModal(!modal)}><Settings /> Configuração do gerador</Button>
      <Modal.Root isOpen={modal}>
        <Modal.Title>Configuração</Modal.Title>
        <Modal.Content className="flex flex-col gap-4">
          <div className="space-y-2">
            {calcMode === 'points' ? (
              <>
                <h4>Pontuação máxima</h4>
                <Input value={speedInputValue} onChange={calcSpeedStorage} placeholder="Valor..." type="number" />
              </>
            ) : (
              <>
                <h4>Tempo máximo</h4>
                <CalcTimeToggle />
              </>
            )}
          </div>
          <div className="space-y-2">
            <h4>Valor máximo</h4>
            <Input value={calcSizeInputValue} onChange={calcSizeStorage} placeholder="Valor..." type="number" />
          </div>
          <div className="space-y-2">
            <h4>Positivo ou negativo</h4>
            <CalcNegativeToggle />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="danger"
            onClick={() => {
              setModal(!modal);
            }}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal.Root>
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

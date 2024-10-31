import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import InputCalc from './InputCalc';
import Tag from './Tag';
import Modal from './Modal';
import Button from './Button';
import { RandomNumber } from '../scripts/RandomNumber';
import { StringNegativeFormat } from '../scripts/StringNegativeFormat';

export default function Play() {
  const [input, setInput] = useState('');
  const [math, setMath] = useState({ n1: 0, n2: 0 });
  const [change, setChange] = useState(true);
  const [pontos, setPontos] = useState(0);
  const [erros, setErros] = useState(0);
  const [color, setColor] = useState('');
  const [timer, setTimer] = useState(false);
  const [timerStorage, setTimerStorage] = useState(0);
  const [timerEnd, setTimerEnd] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [stored, setStored] = useState({ n1: 0, n2: 0, n3: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);

  const navigate = useNavigate();

  const { type, mode, mode_config, negativo, maximo } = useParams();

  const configCalc = {
    tipo: type || 'soma',
    mode: mode || 'speedrun',
    mode_config: mode_config || '10',
    negativo: negativo || 'false',
    maximo: maximo || 100,
  };

  useEffect(() => {
    setTimerStorage(Date.now());
  }, [timer]);

  const TimeTracker = () => {
    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - timerStorage;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const milliseconds = elapsedMilliseconds % 1000;

    setTimerEnd(`${minutes}:${seconds}.${milliseconds}`);
  };

  if (configCalc.mode === 'speedrun') {
    useEffect(() => {
      if (pontos >= Number(configCalc.mode_config)) {
        openModal();
      }
    }, [pontos]);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  if (configCalc.mode === 'timer') {
    useEffect(() => {
      let timerSelect;

      switch (configCalc.mode_config) {
        case '30s':
          timerSelect = 30;
          break;
        case '1m':
          timerSelect = 60;
          break;
        case '5m':
          timerSelect = 300;
          break;
        case '10m':
          timerSelect = 600;
          break;
        case '30m':
          timerSelect = 1800;
          break;
        case 'infinito':
          timerSelect = Infinity;
          break;
        default:
          break;
      }

      if (seconds >= timerSelect) {
        openModal();
      }
    }, [seconds]);
  }

  const openModal = () => {
    TimeTracker();
    setIsActive(false);
    setIsModalOpen(true);
    document.activeElement.blur();
  };

  useEffect(() => {
    setMath({
      n1: RandomNumber(configCalc.tipo, configCalc.negativo, configCalc.maximo),
      n2: RandomNumber(configCalc.tipo, configCalc.negativo, configCalc.maximo),
    });
  }, [change]);

  const calcContainer = new Object();

  switch (configCalc.tipo) {
    case 'soma':
      calcContainer.calculo = math.n1 + math.n2;
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)} + ${StringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${stored.n1} + ${stored.n2} = ${stored.n3}`;
      break;
    case 'subt':
      calcContainer.calculo = math.n1 - math.n2;
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)} - ${StringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${stored.n1} - ${stored.n2} = ${stored.n3}`;
      break;
    case 'mult':
      calcContainer.calculo = math.n1 * math.n2;
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)} × ${StringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${stored.n1} × ${stored.n2} = ${stored.n3}`;
      break;
    case 'divi':
      calcContainer.calculo = Number.isInteger(math.n1 / math.n2) ? math.n1 / math.n2 : (math.n1 / math.n2).toFixed(2);
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)} ÷ ${StringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${stored.n1} ÷ ${stored.n2} = ${stored.n3}`;
      calcContainer.texto =
        'Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: 3÷2 = 1.5, 8÷3 = 2.67';
      break;
    case 'raiz2':
      calcContainer.calculo = Number.isInteger(Math.sqrt(math.n1)) ? Math.sqrt(math.n1) : Math.sqrt(math.n1).toFixed(2);
      calcContainer.calculoString = `√${math.n1}`;
      calcContainer.anterior = `√${stored.n1} = ${stored.n3}`;
      calcContainer.texto =
        'Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: √5 = 2.24, √10 = 3.16. Esse modo pode ter contas erradas!';
      break;
    case 'expo2':
      calcContainer.calculo = math.n1 * math.n1;
      calcContainer.calculoString = `${StringNegativeFormat(math.n1)}²`;
      calcContainer.anterior = `${stored.n1}² = ${stored.n3}`;
      break;
    case 'expo3':
      calcContainer.calculo = math.n2 * math.n2 * math.n2;
      calcContainer.calculoString = `${StringNegativeFormat(math.n2)}³`;
      calcContainer.anterior = `${stored.n2}³ = ${stored.n3}`;
      break;
  }

  function valueCheck() {
    const value = calcContainer.calculo;

    if (input != value) {
      valueChange();
      setErros(erros + 1);
      setColor('red');
    }

    if (input == value) {
      valueChange();
      setPontos(pontos + 1);
      setColor('green');
    }
  }

  function valueChange() {
    setTimer(true);
    setIsActive(true);
    setChange(!change);
    setInput('');
    setStored({
      n1: StringNegativeFormat(math.n1),
      n2: StringNegativeFormat(math.n2),
      n3: calcContainer.calculo,
    });
  }

  function BackToMenu({ text }) {
    let openModal = () => {
      setIsModalExitOpen(true);
      document.activeElement.blur();
    };

    return (
      <button
        onClick={openModal}
        className="w-full h-14 flex justify-center items-center text-white rounded-lg hover:font-bold bg-red-500 hover:bg-red-800 active:bg-red-700">
        {text}
      </button>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    valueCheck();
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="my-4">{calcContainer.calculoString}</h1>
        <div className="flex flex-row gap-2 my-3 justify-center flex-wrap">
          <Tag texto={pontos} tipo="pontos" />
          <Tag texto={erros} tipo="erros" />
          <Tag texto={calcContainer.anterior} tipo="anterior" />
          <Tag texto={seconds} tipo="time" />
        </div>
        <form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>
          <InputCalc
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Resultado..."
            required={false}
            autoFocus={true}
            color={color}
          />
          <Button text="Calcular" onClick={valueCheck} />
        </form>
        <BackToMenu text="Voltar" />
        {calcContainer.text ? '' : <p className="text-black dark:text-white">{calcContainer.texto}</p>}
        {isModalOpen && (
          <Modal>
            <h2>Pontuação</h2>
            <p>Acertos: {pontos}</p>
            <p>Erros: {erros}</p>
            {configCalc.mode === 'timer' && <p>Tempo: {seconds}</p>}
            {configCalc.mode === 'speedrun' && <p>Tempo: {timerEnd}</p>}
            <div className="flex flex-row gap-4">
              <button
                className="mt-4 px-4 py-2 w-full bg-green-500 text-white rounded-md hover:bg-green-600 hover:font-bold"
                onClick={() => {
                  window.location.reload();
                }}>
                Jogar Novamente
              </button>
              <button
                className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded-md hover:bg-red-600 hover:font-bold"
                onClick={() => navigate('/jogar')}>
                Menu
              </button>
            </div>
          </Modal>
        )}
        {isModalExitOpen && (
          <Modal>
            <h2>Tem certeza?</h2>
            <p>Acertos: {pontos}</p>
            <p>Erros: {erros}</p>
            <p>Tempo: {seconds}</p>
            <div className="flex flex-row gap-4">
              <button
                className="mt-4 px-4 py-2 w-full bg-green-500 text-white rounded-md hover:bg-green-600 hover:font-bold"
                onClick={() => {
                  setIsModalExitOpen(false);
                }}>
                Cancelar
              </button>
              <button
                className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded-md hover:bg-red-600 hover:font-bold"
                onClick={() => navigate('/jogar')}>
                Confirmar
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

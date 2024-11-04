import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import InputCalc from './InputCalc';
import Tag from './Tag';
import Modal from './Modal';
import Button from './Button';
import { RandomNumber } from '../scripts/RandomNumber';
import { StringNegativeFormat } from '../scripts/StringNegativeFormat';
import { Calc } from '../scripts/Calc';

export default function Play() {
  const [input, setInput] = useState('');
  const [math, setMath] = useState({ n1: 0, n2: 0 });
  const [change, setChange] = useState(true);
  const [pontos, setPontos] = useState(0);
  const [score, setScore] = useState(0);
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
    let currentTime = Date.now();
    let elapsedMilliseconds = currentTime - timerStorage;
    let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    let minutes = Math.floor(elapsedSeconds / 60);
    let seconds = elapsedSeconds % 60;
    let milliseconds = elapsedMilliseconds % 1000;

    setTimerEnd(`${minutes}:${seconds}.${milliseconds}`);
  };

  if (configCalc.mode === 'speedrun') {
    useEffect(() => {
      if (score >= Number(configCalc.mode_config)) {
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

  if (configCalc.tipo === ('maior' || 'menor')) {
    useEffect(() => {
      setMath({
        n1: RandomNumber(configCalc.tipo, configCalc.negativo, configCalc.maximo),
        n2: RandomNumber(configCalc.tipo, configCalc.negativo, configCalc.maximo),
      });
    }, [change]);
  } else {
    useEffect(() => {
      setMath({
        n1: RandomNumber(configCalc.tipo, configCalc.negativo, configCalc.maximo),
        n2: RandomNumber(configCalc.tipo, configCalc.negativo, configCalc.maximo),
      });
    }, [change]);
  }

  const calcContainer = Calc(
    configCalc.tipo,
    { n1: math.n1, n2: math.n2 },
    { n1: stored.n1, n2: stored.n2, n3: stored.n3 }
  );

  const valueCheckDouble = (result) => {
    let value = calcContainer.calculo;

    if (result != value) {
      valueChange();
      setErros(erros + 1);
      setScore(score - 1);
      setColor('red');
    }

    if (result === value) {
      valueChange();
      setScore(score + 1);
      setPontos(pontos + 1);
      setColor('green');
    }
  };

  function valueCheck() {
    let value = calcContainer.calculo;
    let result = Number(input);

    if (configCalc.mode === 'speedrun') {
      if (result != value) {
        valueChange();
        setErros(erros + 1);
        setScore(score - 1);
        setColor('red');
      }

      if (result === value) {
        valueChange();
        setScore(score + 1);
        setPontos(pontos + 1);
        setColor('green');
      }
    }
    if (configCalc.mode === 'timer') {
      if (result != value) {
        valueChange();
        setErros(erros + 1);
        setColor('red');
      }

      if (result === value) {
        valueChange();
        setPontos(pontos + 1);
        setColor('green');
      }
    }
  }

  const valueChange = () => {
    setTimer(true);
    setIsActive(true);
    setChange(!change);
    setInput('');
    setStored({
      n1: StringNegativeFormat(math.n1),
      n2: StringNegativeFormat(math.n2),
      n3: calcContainer.calculo,
    });
  };

  const BackToMenu = ({ text }) => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    valueCheck();
  };

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="my-4">{calcContainer.calculoString}</h1>
        <div className="flex flex-row gap-2 my-3 justify-center flex-wrap">
          {configCalc.mode === 'speedrun' && (
            <Tag text={`${score} / ${configCalc.mode_config}`} tipo="score" color={color} />
          )}
          {configCalc.mode === 'timer' && (
            <>
              <Tag text={pontos} tipo="pontos" />
              <Tag text={erros} tipo="erros" />
            </>
          )}
          <Tag text={calcContainer.anterior} tipo="anterior" />
          <Tag text={seconds} tipo="time" />
        </div>
        {!['maior', 'menor'].includes(configCalc.tipo) && (
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
        )}
        {['maior', 'menor'].includes(configCalc.tipo) && (
          <form className="flex flex-row gap-3 items-center w-full" onSubmit={handleSubmit}>
            <Button
              text={
                <>
                  <i className="fa-solid fa-arrow-up"></i> Maior
                </>
              }
              onClick={() => valueCheckDouble('maior')}
            />
            <Button
              text={
                <>
                  <i className="fa-solid fa-arrow-down"></i> Menor
                </>
              }
              onClick={() => valueCheckDouble('menor')}
            />
          </form>
        )}
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

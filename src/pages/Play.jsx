import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputCalc from '../components/InputCalc';
import Tag from '../components/Tag';
import Button from '../components/Button';
import { Collapse } from '../components/Collapse';
import { Modal } from '../components/Modal';
import { RandomNumber } from '../scripts/RandomNumber';
import { StringNegativeFormat } from '../scripts/StringNegativeFormat';
import { Calc } from '../scripts/Calc';

import { Check, Clock, Frown, X } from 'lucide-react';

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
  const [stored, setStored] = useState({ n1: '', n2: '', n3: '' });
  const [storedArry, setStoredArry] = useState(['']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);

  const navigate = useNavigate();

  const { type, mode, mode_config, negativo, maximo } = useParams();

  const configCalc = {
    tipo: type || 'soma',
    mode: mode || 'points',
    mode_config: mode_config || '10',
    negativo: negativo || 'only-positive',
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

    setTimerEnd(`${minutes}m ${seconds}s ${milliseconds}ms`);
  };

  if (configCalc.mode === 'points') {
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
    document.activeElement.blur();
    TimeTracker();
    setIsActive(false);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setMath({
      n1: RandomNumber(configCalc.tipo, configCalc.negativo, configCalc.maximo),
      n2: RandomNumber(configCalc.tipo, configCalc.negativo, configCalc.maximo),
    });
  }, [change]);

  const calcContainer = Calc(
    configCalc.tipo,
    { n1: math.n1, n2: math.n2 },
    { n1: stored.n1, n2: stored.n2, n3: stored.n3 },
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

    if (configCalc.mode === 'points') {
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

  const addString = (anterior) => {
    setStoredArry((prevStrings) => {
      const updatedStrings = [anterior, ...prevStrings];
      return updatedStrings.slice(0, 10);
    });
  };

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

  useEffect(() => {
    if (isActive) {
      return addString(calcContainer.anterior);
    }
  }, [stored]);

  const handleSubmit = (e) => {
    e.preventDefault();
    valueCheck();
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h1 className="my-4">{calcContainer.calculoString}</h1>
      <div className="mb-4">
        <div className="w-full flex flex-row gap-2 mb-2 justify-center flex-wrap">
          {configCalc.mode === 'points' && (
            <Tag text={`${score} / ${configCalc.mode_config}`} tipo="score" color={color} />
          )}
          {configCalc.mode === 'timer' && (
            <>
              <Tag text={pontos} tipo="pontos" />
              <Tag text={erros} tipo="erros" />
            </>
          )}
          <Tag text={seconds} tipo="time" />
        </div>
      </div>
      {!['maior', 'menor'].includes(configCalc.tipo) && (
        <>
          <form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>
            <InputCalc
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Resultado..."
              required={false}
              autoFocus={true}
              color={color}
            />
            <Button onClick={valueCheck}>Calcular</Button>
          </form>
          <Button
            variant="danger"
            onClick={() => {
              setIsModalExitOpen(true);
            }}>
            Voltar
          </Button>
        </>
      )}
      {['maior', 'menor'].includes(configCalc.tipo) && (
        <>
          <form className="flex flex-row gap-3 items-center w-full" onSubmit={handleSubmit}>
            <Button variant="success" onClick={() => valueCheckDouble('verdadeiro')}>
              <Check /> Verdadeiro
            </Button>
            <Button variant="danger" onClick={() => valueCheckDouble('falso')}>
              <X /> Falso
            </Button>
          </form>
          <Button
            onClick={() => {
              setIsModalExitOpen(true);
            }}>
            Voltar
          </Button>
        </>
      )}
      <Collapse.Root>
        <Collapse.Toggle>Histórico</Collapse.Toggle>
        <Collapse.Content>
          {storedArry.map((string, index) => (
            <p key={index} className="mb-0 font-semibold">
              {string}
            </p>
          ))}
          {storedArry[0] === '' && (
            <p className="mb-0 font-semibold flex flex-row items-center gap-2">
              Aqui está tão vazio quanto a minha conta bancária... <Frown />
            </p>
          )}
        </Collapse.Content>
      </Collapse.Root>
      {calcContainer.texto && <p className="text-text">{calcContainer.texto}</p>}
      <Modal.Root isOpen={isModalOpen}>
        <Modal.Title>Pontuação</Modal.Title>
        <Modal.Content>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full py-2 px-4 flex flex-row justify-between gap-4 bg-success text-neutral-100 font-semibold rounded-t-sm">
              <div className="flex flex-row justify-center gap-4">
                <Check /> Certos
              </div>
              {pontos}
            </div>
            <div className="w-full py-2 px-4 flex flex-row justify-between gap-4 bg-danger text-neutral-100 font-semibold">
              <div className="flex flex-row justify-center gap-4">
                <X /> Errados
              </div>
              {erros}
            </div>
            <div className="w-full py-2 px-4 flex flex-row justify-between gap-4 bg-warning text-neutral-100 font-semibold rounded-b-sm">
              <div className="flex flex-row justify-center gap-4">
                <Clock /> Tempo
              </div>
              {configCalc.mode === 'points' ? `${timerEnd}` : `${seconds}`}
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button variant="outline" onClick={() => navigate('/')}>
            Gerador
          </Button>
          <Button
            onClick={() => {
              setChange(!change)
              setInput('')
              setPontos(0)
              setScore(0)
              setErros(0)
              setColor('')
              setTimer(false)
              setTimerStorage(0)
              setTimerEnd('')
              setSeconds(0)
              setIsActive(false)
              setStored({ n1: '', n2: '', n3: '' })
              setStoredArry([''])
              setIsModalOpen(!isModalOpen)
            }}>
            Reiniciar
          </Button>
        </Modal.Actions>
      </Modal.Root>
      {/* 
      
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
  const [stored, setStored] = useState({ n1: '', n2: '', n3: '' });
  const [storedArry, setStoredArry] = useState(['']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);
      */}
      <Modal.Root isOpen={isModalExitOpen}>
        <Modal.Title>Tem certeza?</Modal.Title>
        <Modal.Content>
          <p>Todo o seu progresso será perdido ao continuar.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="outline"
            onClick={() => {
              setIsModalExitOpen(false);
            }}>
            Cancelar
          </Button>
          <Button onClick={() => navigate('/')}>Continuar</Button>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
}

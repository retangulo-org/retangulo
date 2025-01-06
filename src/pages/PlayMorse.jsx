import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputCalc from '../components/InputCalc';
import Tag from '../components/Tag';
import Button from '../components/Button';
import { Collapse } from '../components/Collapse';
import { Modal } from '../components/Modal';
import { Check, Clock, Frown, X } from 'lucide-react';
import Return from '../components/Return';
import { MorseFormat } from '../scripts/MorseFormat';
import { faker } from '@faker-js/faker';

export default function PlayMorse() {
  const [palavra, setPalavra] = useState('');
  const [input, setInput] = useState('');
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
  const [stored, setStored] = useState({ n1: '', n2: '' });
  const [storedArry, setStoredArry] = useState(['']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);

  const navigate = useNavigate();

  const { type, translate, mode, mode_config } = useParams();

  const configCalc = {
    type: type || 'word',
    translate: translate || 'toMorse',
    mode: mode || 'points',
    mode_config: mode_config || '10',
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
          timerSelect = 60;
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
    switch (configCalc.type) {
      case 'word':
        setPalavra(faker.word.noun());
        break;
      case 'alphabet':
        setPalavra(faker.string.alpha({ length: 1, casing: 'upper' }));
        break;
    }
  }, [change]);

  const morseContainer = MorseFormat(configCalc.translate, palavra, { n1: stored.n1, n2: stored.n2 });

  function valueCheck() {
    let value = morseContainer.result;
    let result = input;

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
    setStored(morseContainer.result);
    setStored({
      n1: morseContainer.string,
      n2: morseContainer.result,
    });
  };

  useEffect(() => {
    if (isActive) {
      return addString(morseContainer.anterior);
    }
  }, [stored]);

  const handleSubmit = (e) => {
    e.preventDefault();
    valueCheck();
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Return text="Playground" url="/morse" onClick={() => setIsModalExitOpen(true)} />
      <h1 className="my-4">{morseContainer.string}</h1>
      <div className="mb-4">
        <div className="w-full flex flex-row gap-2 mb-2 justify-center flex-wrap">
          {configCalc.mode === 'points' && (
            <Tag text={`${score} / ${configCalc.mode_config}`} type="score" color={color} />
          )}
          {configCalc.mode === 'timer' && (
            <>
              <Tag text={pontos} type="pontos" />
              <Tag text={erros} type="erros" />
            </>
          )}
          <Tag text={seconds} type="time" />
        </div>
      </div>
      <form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>
        <InputCalc
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Resultado..."
          required={false}
          autoFocus={true}
          color={color}
          type="text"
        />
        <Button onClick={valueCheck}>Calcular</Button>
      </form>
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
      {morseContainer.texto && <p className="text-text">{morseContainer.texto}</p>}
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
              setChange(!change);
              setInput('');
              setPontos(0);
              setScore(0);
              setErros(0);
              setColor('');
              setTimer(false);
              setTimerStorage(0);
              setTimerEnd('');
              setSeconds(0);
              setIsActive(false);
              setStored({ n1: '', n2: '', n3: '' });
              setStoredArry(['']);
              setIsModalOpen(!isModalOpen);
            }}>
            Reiniciar
          </Button>
        </Modal.Actions>
      </Modal.Root>
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
          <Button onClick={() => navigate('/morse')}>Continuar</Button>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
}

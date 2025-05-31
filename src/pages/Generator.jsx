import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputCalc from '../components/InputCalc';
import Tag from '../components/Tag';
import Button from '../components/Button';
import { Collapse } from '../components/Collapse';
import { Modal } from '../components/Modal';
import { RandomNumber } from '../scripts/RandomNumber';
import { StringNegativeFormat } from '../scripts/StringNegativeFormat';
import { Calc } from '../scripts/Calc';
import { ArrowLeft, Check, Clock, Frown, X } from 'lucide-react';

export default function Generator() {
  const [input, setInput] = useState('');
  const [math, setMath] = useState({ n1: 0, n2: 0 });
  const [change, setChange] = useState(true);
  const [pontos, setPontos] = useState(0);
  const [score, setScore] = useState(0);
  const [erros, setErros] = useState(0);
  const [color, setColor] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [stored, setStored] = useState({ n1: '', n2: '', n3: '' });
  const [storedArry, setStoredArry] = useState(['']);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if ([...params].length === 0) {
      navigate('/');
    }
  }, [params, navigate]);

  const gameConfig = {
    type: params.get('type'),
    mode_config: params.get('time'),
    negative: params.get('int'),
    maximo: params.get('max'),
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    let timerSelect;

    switch (gameConfig.mode_config) {
      case '15s':
        timerSelect = 15;
        break;
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

  const openModal = () => {
    document.activeElement.blur();
    setIsActive(false);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setMath({
      n1: RandomNumber(gameConfig.negative, gameConfig.maximo),
      n2: RandomNumber(gameConfig.negative, gameConfig.maximo),
    });
  }, [change]);

  let gameContainer;

  gameContainer = Calc(gameConfig.type, { n1: math.n1, n2: math.n2 }, { n1: stored.n1, n2: stored.n2, n3: stored.n3 });

  const valueCheckDouble = (result) => {
    let value = gameContainer.result;

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
    let value = gameContainer.result.toString().toLowerCase();
    let result = input.toString().toLowerCase();

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

  const addString = (anterior) => {
    setStoredArry((prevStrings) => {
      const updatedStrings = [anterior, ...prevStrings];
      return updatedStrings.slice(0, 10);
    });
  };

  const valueChange = () => {
    setIsActive(true);
    setChange(!change);
    setInput('');
    setStored({
      n1: StringNegativeFormat(math.n1),
      n2: StringNegativeFormat(math.n2),
      n3: gameContainer.result,
    });
  };

  useEffect(() => {
    if (isActive) {
      return addString(gameContainer.anterior);
    }
  }, [stored]);

  const Reset = () => {
    setChange(!change);
    setInput('');
    setPontos(0);
    setScore(0);
    setErros(0);
    setColor('');
    setSeconds(0);
    setIsActive(false);
    setStored({ n1: '', n2: '', n3: '' });
    setStoredArry(['']);
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <div className="w-full relative flex flex-row justify-between items-center">
        <Button size="icon" variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft />
        </Button>
        <h3 className="absolute w-full m-0 p-0 text-center pointer-events-none">Matemática</h3>
      </div>
      <h1 className="my-4">{gameContainer.string}</h1>
      <div className="mb-4">
        <div className="w-full flex flex-row gap-2 mb-2 justify-center flex-wrap">
          <Tag text={pontos} type="pontos" />
          <Tag text={seconds} type="time" />
          <Tag text={erros} type="erros" />
        </div>
      </div>
      {!['maior', 'menor'].includes(gameConfig.type) && (
        <form
          className="flex flex-col gap-4 items-center w-full"
          onSubmit={(e) => {
            e.preventDefault();
            valueCheck();
          }}>
          <InputCalc
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Resultado..."
            required={false}
            autoFocus={false}
            type={'number'}
            inputMode={'numeric'}
            color={color}
          />
          <Button onClick={valueCheck}>Confirmar</Button>
        </form>
      )}
      {['maior', 'menor'].includes(gameConfig.type) && (
        <form
          className="flex flex-row gap-3 items-center w-full"
          onSubmit={(e) => {
            e.preventDefault();
            valueCheck();
          }}>
          <Button variant="success" onClick={() => valueCheckDouble('verdadeiro')}>
            <Check /> Verdadeiro
          </Button>
          <Button variant="danger" onClick={() => valueCheckDouble('falso')}>
            <X /> Falso
          </Button>
        </form>
      )}
      <Collapse.Root>
        <Collapse.Toggle>Histórico</Collapse.Toggle>
        <Collapse.Content>
          {storedArry[0] != '' &&
            storedArry.map((string, index) => (
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
      {gameContainer.texto && <p className="text-text">{gameContainer.texto}</p>}
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
              {seconds}
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={() => {
              Reset();
              setIsModalOpen(false);
            }}>
            Reiniciar
          </Button>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
}

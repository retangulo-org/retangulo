import React, { useState, useEffect } from 'react';
import InputCalc from '../components/InputCalc';
import Input from '../components/Input';
import Tag from '../components/Tag';
import Button from '../components/Button';
import { Collapse } from '../components/Collapse';
import { Select } from '../components/Select';
import { Modal } from '../components/Modal';
import { RandomNumber } from '../scripts/RandomNumber';
import { StringNegativeFormat } from '../scripts/StringNegativeFormat';
import { Calc } from '../scripts/Calc';
import { MorseFormat } from '../scripts/MorseFormat';
import { Check, Clock, Frown, Settings, X } from 'lucide-react';
import { faker } from '@faker-js/faker';

export default function Play() {
  const [game, setGame] = useState('math');
  const [type, setType] = useState('soma');
  const [modeConfig, setModeConfig] = useState('1m');
  const [max, setMax] = useState(100);
  const [negative, setNegative] = useState('only-positive');
  const [word, setWord] = useState('');
  const [input, setInput] = useState('');
  const [translate, setTranslate] = useState('toMorse');
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
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);

  const gameConfig = {
    game: game,
    type: type,
    mode_config: modeConfig,
    negative: negative,
    maximo: max,
    translate: translate,
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

  if (gameConfig.game === 'math') {
    useEffect(() => {
      setMath({
        n1: RandomNumber(gameConfig.type, gameConfig.negative, gameConfig.maximo),
        n2: RandomNumber(gameConfig.type, gameConfig.negative, gameConfig.maximo),
      });
    }, [change]);
  }

  if (gameConfig.game === 'morse') {
    useEffect(() => {
      switch (gameConfig.type) {
        case 'word':
          setWord(faker.word.noun());
          break;
        case 'alphabet':
          setWord(faker.string.alpha({ length: 1, casing: 'upper' }));
          break;
      }
    }, [change]);
  }

  let gameContainer;

  if (gameConfig.game === 'math') {
    gameContainer = Calc(
      gameConfig.type,
      { n1: math.n1, n2: math.n2 },
      { n1: stored.n1, n2: stored.n2, n3: stored.n3 },
    );
  }

  if (gameConfig.game === 'morse') {
    gameContainer = MorseFormat(gameConfig.translate, word, { n1: stored.n1, n2: stored.n2 });
  }

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
    if (gameConfig.game === 'math') {
      setStored({
        n1: StringNegativeFormat(math.n1),
        n2: StringNegativeFormat(math.n2),
        n3: gameContainer.result,
      });
    }

    if (gameConfig.game === 'morse') {
      setStored({
        n1: gameContainer.string,
        n2: gameContainer.result,
      });
    }
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
      <div className="w-full flex flex-row gap-2">
        <div className="w-full flex flex-row gap-2 rounded-md overflow-x-auto shadow-inner">
          <div className="w-full flex flex-row gap-2 p-2 rounded-r-md bg-foreground">
            <Button
              variant={gameConfig.game === 'math' ? 'primary' : 'outline'}
              onClick={() => {
                setGame('math');
                setType('soma');
                Reset();
              }}>
              Matemática
            </Button>
            <Button
              variant={gameConfig.game === 'morse' ? 'primary' : 'outline'}
              onClick={() => {
                setGame('morse');
                setType('alphabet');
                Reset();
              }}>
              Morse
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-row p-2 basis-0 rounded-md bg-foreground">
          <Button variant="primary" size="icon" name="Configuração" onClick={() => setIsModalExitOpen(true)}>
            <Settings />
          </Button>
        </div>
      </div>
      <h1 className="my-4">{gameContainer.string}</h1>
      <div className="mb-4">
        <div className="w-full flex flex-row gap-2 mb-2 justify-center flex-wrap">
          <Tag text={pontos} type="pontos" />
          <Tag text={erros} type="erros" />
          <Tag text={seconds} type="time" />
        </div>
      </div>
      {!['maior', 'menor'].includes(gameConfig.type) && (
        <form
          className="flex flex-col gap-3 items-center w-full"
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
            type={gameConfig.game === 'math' ? 'number' : 'text'}
            inputMode={gameConfig.game === 'math' ? 'numeric' : 'text'}
            color={color}
          />
          <Button onClick={valueCheck}>Calcular</Button>
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
      <Modal.Root isOpen={isModalExitOpen}>
        <Modal.Content>
          <div>
            <h4 className="mb-2">Tempo máximo</h4>
            <Select.Root
              value={modeConfig}
              onChange={(event) => {
                setModeConfig(event.target.value);
                Reset();
              }}>
              <Select.Content value="15s" option="15 segundos" />
              <Select.Content value="30s" option="30 segundos" />
              <Select.Content value="1m" option="1 minuto" />
              <Select.Content value="5m" option="5 minutos" />
              <Select.Content value="10m" option="10 minutos" />
              <Select.Content value="30m" option="30 minutos" />
              <Select.Content value="infinito" option="Sem limite" />
            </Select.Root>
            {game === 'math' && (
              <>
                <h4 className="mt-4 mb-2">Modos</h4>
                <div className="flex flex-row gap-2 p-2 overflow-x-scroll border-2 border-foreground bg-foreground shadow-inner rounded-md">
                  {[
                    ['Soma', 'soma'],
                    ['Subtração', 'subt'],
                    ['Multiplicação', 'mult'],
                    ['Divisão', 'divi'],
                    ['Raiz Quadrada', 'raiz2'],
                    ['Expoente 2', 'expo2'],
                    ['Expoente 3', 'expo3'],
                    ['Maior', 'maior'],
                    ['Menor', 'menor'],
                  ].map(([title, key]) => (
                    <Button
                      key={key}
                      variant={type === key ? 'primary' : 'outline'}
                      onClick={() => {
                        setType(key);
                        Reset();
                      }}>
                      {title}
                    </Button>
                  ))}
                </div>
                <h4 className="mt-4 mb-2">Valor máximo</h4>
                <Input
                  value={max}
                  onChange={(e) => {
                    setMax(e.target.value);
                    Reset();
                  }}
                  id="valor-maximo"
                  name="valor-maximo"
                  type="number"
                  inputMode="numeric"
                  placeholder="Valor..."
                />
                <h4 className="mt-4 mb-2">Positivo ou negativo</h4>
                <div className="flex flex-row gap-2 p-2 overflow-x-auto border-2 border-foreground bg-foreground shadow-inner rounded-md">
                  {[
                    ['Apenas positivo', 'only-positive'],
                    ['Aleatório', 'random-negative'],
                    ['Apenas negativo', 'only-negative'],
                  ].map(([title, key]) => (
                    <Button
                      key={key}
                      variant={negative === key ? 'primary' : 'outline'}
                      onClick={() => {
                        setNegative(key);
                        Reset();
                      }}>
                      {title}
                    </Button>
                  ))}
                </div>
              </>
            )}
            {game === 'morse' && (
              <>
                <h4 className="mt-4 mb-2">Modos</h4>
                <div className="flex flex-row gap-2 p-2 overflow-x-scroll border-2 border-foreground bg-foreground shadow-inner rounded-md">
                  {[
                    ['Alfabeto', 'alphabet'],
                    ['Palavra', 'word'],
                  ].map(([title, key]) => (
                    <Button
                      key={key}
                      variant={gameConfig.type === key ? 'primary' : 'outline'}
                      onClick={() => {
                        setType(key);
                        Reset();
                      }}>
                      {title}
                    </Button>
                  ))}
                </div>
                <h4 className="mt-4 mb-2">Tradução</h4>
                <div className="flex flex-row gap-2">
                  <Button
                    variant={gameConfig.translate === 'toMorse' ? 'primary' : 'outline'}
                    onClick={() => {
                      setTranslate('toMorse');
                      Reset();
                    }}>
                    Texto Para Morse
                  </Button>
                  <Button
                    variant={gameConfig.translate === 'toTxt' ? 'primary' : 'outline'}
                    onClick={() => {
                      setTranslate('toTxt');
                      Reset();
                    }}>
                    Morse Para Texto
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="danger"
            onClick={() => {
              setIsModalExitOpen(false);
            }}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal.Root>
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

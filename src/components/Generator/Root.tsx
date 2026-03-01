import { useState, useEffect, createContext, ReactNode } from 'react';
import { Modal } from '../Modal';
import Button from '../Button';
import { Select } from '../Select';
import Input from '../Input';
import { RandomMath } from '../../scripts/randomMath';
import { RotateCcw, X } from 'lucide-react';

type MathType = 'soma' | 'subt' | 'mult' | 'divi';
type MathTime = '15s' | '30s' | '1m' | '5m' | '10m' | '30m' | 'infinito';
type MathInt = 'positive' | 'random' | 'negative';

interface StoredState {
  n1: any;
  n2: any;
  n3: any;
}

interface RootContextType {
  result: number;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  output: (string | number)[];
  correct: number;
  wrong: number;
  color: string;
  isActive: boolean;
  seconds: number;
  storedArray: any[];
  score: boolean;
  setScore: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RootContext = createContext<RootContextType | undefined>(undefined);

export default function Root({ children, math }: { children: ReactNode; math: boolean }) {
  const [input, setInput] = useState<string>('');
  const [correct, setCorrect] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);
  const [color, setColor] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [stored, setStored] = useState<StoredState>({ n1: '', n2: '', n3: '' });
  const [storedArray, setStoredArray] = useState<string[]>(['']);
  const [score, setScore] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const [mathType, setMathType] = useState<MathType[]>(() => [
    (localStorage.getItem('mathType') as MathType) || 'soma',
  ]);
  const [mathTime, setMathTime] = useState<MathTime>(() => {
    return (localStorage.getItem('mathTime') as MathTime) || '1m';
  });
  const [mathMax, setMathMax] = useState<number>(() => {
    return Number(localStorage.getItem('mathMax')) || 100;
  });
  const [mathSize, setMathSize] = useState<number>(() => {
    return Number(localStorage.getItem('mathSize')) || 2;
  });
  const [mathInt, setMathInt] = useState<MathInt>(() => {
    return (localStorage.getItem('mathInt') as MathInt) || 'positive';
  });

  const [random, setRandom] = useState<any>(() => RandomMath(mathSize, mathMax, mathInt, mathType));

  const [result, setResult] = useState<number>(() => Number(eval(random.join(''))));

  useEffect(() => {
    setResult(eval((random as (string | number)[]).map(String).join('')));
  }, [random]);

  useEffect(() => {
    localStorage.setItem('mathType', mathType.toString());
    localStorage.setItem('mathTime', mathTime);
    localStorage.setItem('mathMax', mathMax.toString());
    localStorage.setItem('mathSize', mathSize.toString());
    localStorage.setItem('mathInt', mathInt);
    Reset();
  }, [mathType, mathTime, mathMax, mathSize, mathInt]);

  const [tempMathType, setTempMathType] = useState<MathType[]>(mathType);
  const [tempMathTime, setTempMathTime] = useState<MathTime>(mathTime);
  const [tempMathMax, setTempMathMax] = useState<number>(mathMax);
  const [tempMathSize, setTempMathSize] = useState<number>(mathSize);
  const [tempMathInt, setTempMathInt] = useState<MathInt>(mathInt);

  useEffect(() => {
    if (tempMathMax > 100000) {
      alert('Valor máximo muito grande!');
      setMathMax(100000);
    }

    if (tempMathSize > 50) {
      alert('Quantidade de termos muito grande!');
      setMathSize(50);
    }
  }, [tempMathMax, tempMathSize]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    let timerSelect: number;

    switch (mathTime) {
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
      (document.activeElement as HTMLElement)?.blur();
      setIsActive(false);
      setScore(true);
      Reset();
    }
  }, [seconds]);

  useEffect(() => {
    if (score === false) {
      Reset();
    }
  }, [score]);

  function Reset(): void {
    setIsActive(false);
    setRandom(() => RandomMath(mathSize, mathMax, mathInt, mathType));
    setCorrect(0);
    setWrong(0);
    setSeconds(0);
    setColor('');
    setStoredArray(['']);
    setInput('');
    setStored({ n1: '', n2: '', n3: '' });
  }

  function Check(): void {
    const inputCheck = input;
    const resultCheck = result;

    if (inputCheck !== resultCheck.toString().toLowerCase()) {
      setWrong((prev) => prev + 1);
      setColor('red');
    }

    if (inputCheck === resultCheck.toString().toLowerCase()) {
      setCorrect((prev) => prev + 1);
      setColor('green');
    }

    ValueChange();
  }

  function ValueChange(): void {
    if (!isActive) setIsActive(true);
    setRandom(() => RandomMath(mathSize, mathMax, mathInt, mathType));
    setInput('');
    setStored({ n1: output, n2: result, n3: input });
  }

  function addString(anterior: string): void {
    setStoredArray((prevStrings) => {
      const updatedStrings = [anterior, ...prevStrings];
      return updatedStrings.slice(0, 10);
    });
  }

  useEffect(() => {
    if (isActive) {
      return addString(
        `${math ? (stored.n1 as string[]).join('').toString() : stored.n1.toString()} = ${stored.n2} — R: ${stored.n3 === '' ? 'sem resposta' : stored.n3}`,
      );
    }
  }, [stored]);

  const output = random.map((char: any) => (char === '*' ? '×' : char === '/' ? '÷' : String(char)));

  return (
    <RootContext.Provider
      value={{
        result,
        input,
        setInput,
        output,
        correct,
        wrong,
        color,
        isActive,
        seconds,
        storedArray,
        score,
        setScore,
        setModal,
      }}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          Check();
        }}
        className="w-full flex flex-col gap-4">
        {children}
      </form>
      <Modal.Root isOpen={modal}>
        <Modal.Title>
          <div className="flex flex-row justify-between">
            <div className="w-auto">Configurações</div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setTempMathType(mathType);
                setTempMathTime(mathTime);
                setTempMathMax(mathMax);
                setTempMathSize(mathSize);
                setTempMathInt(mathInt);
                setModal(false);
              }}>
              <X />
            </Button>
          </div>
        </Modal.Title>
        <Modal.Content>
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="mb-2">Tempo Limite</h4>
              <Select.Root
                value={tempMathTime}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setTempMathTime(event.target.value as MathTime);
                }}>
                {(
                  [
                    ['15 segundos', '15s'],
                    ['30 segundos', '30s'],
                    ['1 minuto', '1m'],
                    ['5 minutos', '5m'],
                    ['10 minutos', '10m'],
                    ['30 minutos', '30m'],
                    ['Infinito', 'infinito'],
                  ] as [string, MathTime][]
                ).map(([tempo_title, tempo]) => (
                  <Select.Content key={tempo} value={tempo} option={tempo_title} />
                ))}
              </Select.Root>
            </div>
            <div>
              <h4 className="mt-4 mb-2">Operações</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {(
                  [
                    ['Adição', 'soma'],
                    ['Subtração', 'subt'],
                    ['Multiplicação', 'mult'],
                    ['Divisão', 'divi'],
                  ] as [string, MathType][]
                ).map(([title, arit]) => (
                  <Button
                    key={arit}
                    size="default"
                    variant={tempMathType.includes(arit) ? 'primary' : 'outline'}
                    onClick={() => {
                      setTempMathType((prev) =>
                        prev.includes(arit) ? prev.filter((t) => t !== arit) : [...prev, arit],
                      );
                    }}>
                    {title}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mt-4 mb-2">Valor máximo</h4>
              <Input
                value={tempMathMax}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTempMathMax(Number(e.target.value));
                }}
                id="valor-maximo"
                name="valor-maximo"
                type="number"
                inputMode="numeric"
                placeholder="Valor"
              />
            </div>
            <div>
              <h4 className="mt-4 mb-2">Quantidade de termos</h4>
              <Input
                value={tempMathSize}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTempMathSize(Number(e.target.value));
                }}
                id="tamanho-maximo"
                name="tamanho-maximo"
                type="number"
                inputMode="numeric"
                placeholder="Valor"
              />
            </div>
            <div>
              <h4 className="mt-4 mb-2">Tipos de valores</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {(
                  [
                    ['Positivos', 'positive'],
                    ['Aleatórios', 'random'],
                    ['Negativos', 'negative'],
                  ] as [string, MathInt][]
                ).map(([title, key]) => (
                  <Button
                    key={key}
                    size={'default'}
                    variant={tempMathInt === key ? 'primary' : 'outline'}
                    onClick={() => {
                      setTempMathInt(key);
                    }}>
                    {title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="mt-8">
          <Button
            className="basis-full"
            variant="default"
            onClick={() => {
              setMathInt(tempMathInt);
              setMathSize(tempMathSize);
              setMathMax(tempMathMax);
              setMathTime(tempMathTime);
              setMathType(tempMathType);
              setModal(false);
            }}>
            Aplicar
          </Button>
          <Button
            size="icon"
            variant="danger"
            onClick={() => {
              setMathType(['soma']);
              setTempMathType(['soma']);
              setMathTime('1m');
              setTempMathTime('1m');
              setMathMax(100);
              setTempMathMax(100);
              setMathSize(2);
              setTempMathSize(2);
              setMathInt('positive');
              setTempMathInt('positive');
            }}>
            <RotateCcw />
          </Button>
        </Modal.Actions>
      </Modal.Root>
    </RootContext.Provider>
  );
}

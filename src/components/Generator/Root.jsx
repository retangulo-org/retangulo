import { useState, useEffect, createContext } from 'react';
import { Modal } from '../Modal';
import Button from '../ui/Button';
import { Select } from '../Select';
import Input from '../ui/Input';
import { RandomMath } from '../../scripts/randomMath';
import { useTranslation } from 'react-i18next';

export const RootContext = createContext(undefined);

export default function Root({ children, math }) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [color, setColor] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [stored, setStored] = useState({ n1: '', n2: '', n3: '' });
  const [storedArray, setStoredArray] = useState(['']);
  const [score, setScore] = useState(false);
  const [modal, setModal] = useState(false);

  const [mathType, setMathType] = useState(() => {
    return localStorage.getItem('mathType') || 'soma';
  });
  const [mathTime, setMathTime] = useState(() => {
    return localStorage.getItem('mathTime') || '1m';
  });
  const [mathMax, setMathMax] = useState(() => {
    return localStorage.getItem('mathMax') || 100;
  });
  const [mathSize, setMathSize] = useState(() => {
    return localStorage.getItem('mathSize') || 2;
  });
  const [mathInt, setMathInt] = useState(() => {
    return localStorage.getItem('mathInt') || 'positive';
  });

  const [random, setRandom] = useState(() => RandomMath(mathSize, mathMax, mathInt, mathType));
  const [result, setResult] = useState(eval(random.join('')));

  useEffect(() => {
    setResult(eval(random.join('')));
  }, [random]);

  useEffect(() => {
    localStorage.setItem('mathType', mathType);
    localStorage.setItem('mathTime', mathTime);
    localStorage.setItem('mathMax', mathMax);
    localStorage.setItem('mathSize', mathSize);
    localStorage.setItem('mathInt', mathInt);
  }, [mathType, mathTime, mathMax, mathSize, mathInt]);

  useEffect(() => {
    if (mathMax > 100000) {
      alert(t('tMaxValueTooLarge'));
      setMathMax(100000);
    }

    if (mathSize > 50) {
      alert(t('tNumberOfTermsTooLarge'));
      setMathSize(50);
    }
  }, [mathMax, mathSize]);

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
      document.activeElement.blur();
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

  function Reset() {
    setIsActive(false);
    setRandom(() => RandomMath(mathSize, mathMax, mathInt, mathType));
    setCorrect(0);
    setWrong(0);
    setSeconds(0);
    setColor('');
    setStoredArray(['']);
    setInput('');
    setStored({
      n1: '',
      n2: '',
      n3: '',
    });
  }

  function Check() {
    let inputCheck = input;
    let resultCheck = result;

    if (inputCheck != resultCheck.toString().toLowerCase()) {
      setWrong(wrong + 1);
      setColor('red');
    }

    if (inputCheck === resultCheck.toString().toLowerCase()) {
      setCorrect(correct + 1);
      setColor('green');
    }

    ValueChange();
  }

  function ValueChange() {
    if (isActive === false) setIsActive(true);
    setRandom(() => RandomMath(mathSize, mathMax, mathInt, mathType));
    setInput('');
    setStored({
      n1: output,
      n2: result,
      n3: input,
    });
  }

  function addString(anterior) {
    setStoredArray((prevStrings) => {
      const updatedStrings = [anterior, ...prevStrings];
      return updatedStrings.slice(0, 10);
    });
  }

  useEffect(() => {
    if (isActive) {
      return addString(
        `${math ? stored.n1.join('').toString() : stored.n1.toString()} = ${stored.n2} — R: ${stored.n3 === '' ? 'sem resposta' : stored.n3}`,
      );
    }
  }, [stored]);

  const output = random.map((char) => {
    switch (char.toString()) {
      case '*':
        return '×';
      case '/':
        return '÷';
      default:
        return char;
    }
  });

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
        onSubmit={(e) => {
          e.preventDefault();
          Check();
        }}
        className="w-full flex flex-col gap-4">
        {children}
      </form>
      <Modal.Root isOpen={modal}>
        <Modal.Content>
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="mb-2">{t('tTimeLimit')}</h4>
              <Select.Root
                value={mathTime}
                onChange={(event) => {
                  setMathTime(event.target.value);
                }}>
                {[
                  [`15 ${t('bSeconds')}`, '15s'],
                  [`30 ${t('bSeconds')}`, '30s'],
                  [`1 ${t('bMinute')}`, '1m'],
                  [`5 ${t('bMinutes')}`, '5m'],
                  [`10 ${t('bMinutes')}`, '10m'],
                  [`30 ${t('bMinutes')}`, '30m'],
                  [t('bNoLimit'), 'infinito'],
                ].map(([tempo_title, tempo]) => (
                  <Select.Content value={tempo} option={tempo_title} />
                ))}
              </Select.Root>
            </div>
            <div>
              <h4 className="mt-4 mb-2">{t('tOperations')}</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {[
                  [t('bAddition'), 'soma'],
                  [t('bSubtraction'), 'subt'],
                  [t('bMultiplication'), 'mult'],
                  [t('bDivision'), 'divi'],
                ].map(([title, arit]) => (
                  <Button
                    key={arit}
                    size={'default'}
                    variant={mathType === arit ? 'primary' : 'outline'}
                    onClick={() => {
                      setMathType(arit);
                    }}>
                    {title}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mt-4 mb-2">{t('tMaxValue')}</h4>
              <Input
                value={mathMax}
                onChange={(e) => {
                  setMathMax(e.target.value);
                }}
                id="valor-maximo"
                name="valor-maximo"
                type="number"
                inputMode="numeric"
                placeholder={t('tValue')}
              />
            </div>
            <div>
              <h4 className="mt-4 mb-2">{t('tNumberOfTerms')}</h4>
              <Input
                value={mathSize}
                onChange={(e) => {
                  setMathSize(e.target.value);
                }}
                id="tamanho-maximo"
                name="tamanho-maximo"
                type="number"
                inputMode="numeric"
                placeholder={t('tValue')}
              />
            </div>
            <div>
              <h4 className="mt-4 mb-2">{t('tTypeOfValues')}</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {[
                  [t('bOnlyPositive'), 'positive'],
                  [t('bRandom'), 'random'],
                  [t('bOnlyNegative'), 'negative'],
                ].map(([title, key]) => (
                  <Button
                    key={key}
                    size={'default'}
                    variant={mathInt === key ? 'primary' : 'outline'}
                    onClick={() => {
                      setMathInt(key);
                    }}>
                    {title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="danger"
            onClick={() => {
              setModal(false);
              Reset();
            }}>
            {t('bClose')}
          </Button>
        </Modal.Actions>
      </Modal.Root>
    </RootContext.Provider>
  );
}

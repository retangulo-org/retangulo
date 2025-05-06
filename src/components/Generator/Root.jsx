import React, { useState, useEffect, createContext } from 'react';

export const RootContext = createContext(undefined);

export default function Root({ children, time, output, result, onRegenerate }) {
  const [input, setInput] = useState('');
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [color, setColor] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [stored, setStored] = useState({ n1: '', n2: '', n3: '' });
  const [storedArray, setStoredArray] = useState(['']);
  const [score, setScore] = useState(false);

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

    switch (time) {
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
      console.log(seconds, timerSelect);
      document.activeElement.blur();
      setIsActive(false);
      setScore(true);
      Reset();
    }
  }, [seconds]);

  function Reset() {
    setIsActive(false);
    setCorrect(0);
    setWrong(0);
    setSeconds(0);
    setColor('');
    setStoredArray(['']);
    onRegenerate?.();
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

    if (inputCheck != resultCheck) {
      setWrong(wrong + 1);
      setColor('red');
    }

    if (inputCheck === resultCheck) {
      setCorrect(correct + 1);
      setColor('green');
    }

    ValueChange();
  }

  function ValueChange() {
    if (isActive === false) setIsActive(true);
    onRegenerate?.();
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
      return addString(`${stored.n1.join('').toString()} = ${stored.n2} — R: ${stored.n3 === '' ? ':(' : stored.n3}`);
    }
  }, [stored]);

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
      }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Check();
        }}
        className="w-full flex flex-col gap-4">
        {children}
      </form>
    </RootContext.Provider>
  );
}

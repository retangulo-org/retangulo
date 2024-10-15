import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Input from '../Input';
import Calculo from './Calculo';
import Tag from './Tag';
import Modal from './Modal';
import Button from './Button';

export default function Play() {
  const [input, setInput] = useState('');
  const [math, setMath] = useState({ n1: 0, n2: 0 });
  const [change, setChange] = useState(true);
  const [pontos, setPontos] = useState(0);
  const [erros, setErros] = useState(0);
  // const [color, setColor] = useState();
  const [stored, setStored] = useState({ n1: 0, n2: 0, n3: 0 });
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);

  const navigate = useNavigate();

  const { type, time, negativo, maximo } = useParams();

  const configCalc = {
    tipo: type || 'soma',
    time: time || '1m',
    negativo: negativo || false,
    maximo: maximo || 100,
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
    let timer;

    switch (configCalc.time) {
      case '30s':
        timer = 30;
        break;
      case '1m':
        timer = 60;
        break;
      case '5m':
        timer = 300;
        break;
      case '10m':
        timer = 600;
        break;
      case '30m':
        timer = 1800;
        break;
      case 'infinito':
        timer = Infinity;
        break;
      default:
        break;
    }

    if (seconds >= timer) {
      openModal();
      setIsActive(false);
    }
  }, [seconds]);

  const openModal = () => {
    setIsModalOpen(true);
    document.activeElement.blur();
  };

  useEffect(() => {
    setMath({
      n1: handleRandomNumber(),
      n2: handleRandomNumber(),
    });
  }, [change]);

  function handleRandomNumber() {
    const maximo = configCalc.maximo;

    if (configCalc.tipo === 'raiz2') {
      return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
    }

    if (configCalc.negativo === 'true') {
      return Math.floor(Math.random() * (maximo - -maximo + 1)) + -maximo;
    }

    return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
  }

  function calculoStringNegativeFormat(number) {
    if (number < 0) return `(${number})`;

    return `${number}`;
  }

  const calcContainer = new Object();

  switch (configCalc.tipo) {
    case 'soma':
      calcContainer.calculo = math.n1 + math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n1)} + ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${'\n'}${stored.n1} + ${stored.n2} = ${stored.n3}`;
      break;
    case 'subt':
      calcContainer.calculo = math.n1 - math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n1)} - ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${'\n'}${stored.n1} - ${stored.n2} = ${stored.n3}`;
      break;
    case 'mult':
      calcContainer.calculo = math.n1 * math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n1)} × ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${'\n'}${stored.n1} × ${stored.n2} = ${stored.n3}`;
      break;
    case 'divi':
      calcContainer.calculo = Number.isInteger(math.n1 / math.n2) ? math.n1 / math.n2 : (math.n1 / math.n2).toFixed(2);
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n1)} ÷ ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${'\n'}${stored.n1} ÷ ${stored.n2} = ${stored.n3}`;
      calcContainer.texto =
        'Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: 3÷2 = 1.5, 8÷3 = 2.67';
      break;
    case 'raiz2':
      calcContainer.calculo = Number.isInteger(Math.sqrt(math.n1)) ? Math.sqrt(math.n1) : Math.sqrt(math.n1).toFixed(2);
      calcContainer.calculoString = `√${math.n1}`;
      calcContainer.anterior = `${'\n'}√${stored.n1} = ${stored.n3}`;
      calcContainer.texto =
        'Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: √5 = 2.24, √10 = 3.16. Esse modo pode ter contas erradas!';
      break;
    case 'expo2':
      calcContainer.calculo = math.n1 * math.n1;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n1)}²`;
      calcContainer.anterior = `${'\n'}${stored.n1}² = ${stored.n3}`;
      break;
    case 'expo3':
      calcContainer.calculo = math.n2 * math.n2 * math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n2)}³`;
      calcContainer.anterior = `${'\n'}${stored.n2}³ = ${stored.n3}`;
      break;
  }

  function valueCheck() {
    const value = calcContainer.calculo;

    if (input != value) {
      valueChange();
      setErros(erros + 1);
    }

    if (input == value) {
      valueChange();
      setPontos(pontos + 1);
    }
  }

  function valueChange() {
    setIsActive(true);
    setChange(!change);
    setInput('');
    setStored({
      n1: calculoStringNegativeFormat(math.n1),
      n2: calculoStringNegativeFormat(math.n2),
      n3: calcContainer.calculo,
    });
  }

  function BackToMenu({ text }) {
    let openModal = () => {
      setIsModalExitOpen(true);
      setIsActive(false);
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
      <div className="flex flex-col gap-3 items-center">
        <Calculo text={calcContainer.calculoString} />
        <div className="flex-row space-x-3 my-3">
          <Tag texto={pontos} tipo="pontos" />
          <Tag texto={erros} tipo="erros" />
          <Tag texto={calcContainer.anterior} tipo="anterior" />
          <Tag texto={seconds} tipo="time" />
        </div>
        <form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Resultado..."
            required={false}
            autoFocus={true}
          />
          <Button text="Calcular" onClick={valueCheck} />
        </form>
        <BackToMenu text="Voltar" />
        {calcContainer.text ? '' : <p className="text-black dark:text-white">{calcContainer.texto}</p>}
        {isModalOpen && (
          <Modal>
            <h2 className="text-3xl font-semibold">Pontuação</h2>
            <p className="mt-2">
              <strong>Acertos</strong>: {pontos}
            </p>
            <p className="mt-2">
              <strong>Erros</strong>: {erros}
            </p>
            <p className="mt-2">
              <strong>Tempo</strong>: {seconds}
            </p>
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
                onClick={() => navigate('/')}>
                Menu
              </button>
            </div>
          </Modal>
        )}
        {isModalExitOpen && (
          <Modal>
            <h2 className="text-3xl font-semibold">Tem certeza?</h2>
            <p className="mt-2">
              <strong>Acertos</strong>: {pontos}
            </p>
            <p className="mt-2">
              <strong>Erros</strong>: {erros}
            </p>
            <p className="mt-2">
              <strong>Tempo</strong>: {seconds}
            </p>
            <div className="flex flex-row gap-4">
              <button
                className="mt-4 px-4 py-2 w-full bg-green-500 text-white rounded-md hover:bg-green-600 hover:font-bold"
                onClick={() => {
                  setIsModalExitOpen(false);
                  setIsActive(true);
                }}>
                Cancelar
              </button>
              <button
                className="mt-4 px-4 py-2 w-full bg-red-500 text-white rounded-md hover:bg-red-600 hover:font-bold"
                onClick={() => navigate('/')}>
                Confirmar
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

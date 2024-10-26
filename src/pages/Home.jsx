import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';

import '@fortawesome/fontawesome-free/css/all.min.css';
import InputCalc from '../components/InputCalc';
import Tag from '../components/Tag';

export default function Home() {
  const navigate = useNavigate();

  function PlayHome() {
    const [input, setInput] = useState('');
    const [math, setMath] = useState({ n1: 0, n2: 0 });
    const [change, setChange] = useState(true);
    const [pontos, setPontos] = useState(0);
    const [erros, setErros] = useState(0);
    const [color, setColor] = useState('');
    const [stored, setStored] = useState({ n1: 0, n2: 0, n3: 0 });

    const configCalc = {
      tipo: 'soma',
      negativo: false,
      maximo: 100,
    };

    useEffect(() => {
      setMath({
        n1: handleRandomNumber(),
        n2: handleRandomNumber(),
      });
    }, [change]);

    function handleRandomNumber() {
      const maximo = configCalc.maximo;

      return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
    }

    const calcContainer = new Object();

    calcContainer.calculo = math.n1 + math.n2;
    calcContainer.calculoString = `${math.n1} + ${math.n2}`;
    calcContainer.anterior = `${'\n'}${stored.n1} + ${stored.n2} = ${stored.n3}`;

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
      setChange(!change);
      setInput('');
      setStored({
        n1: math.n1,
        n2: math.n2,
        n3: calcContainer.calculo,
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      valueCheck();
    };

    return (
      <>
        <div className="flex flex-col gap-4 items-center">
          <h1>{calcContainer.calculoString}</h1>
          <div className="flex flex-row gap-2 my-3 justify-center flex-wrap">
            <Tag texto={pontos} tipo="pontos" />
            <Tag texto={erros} tipo="erros" />
            <Tag texto={calcContainer.anterior} tipo="anterior" />
          </div>
          <form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>
            <InputCalc
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Resultado..."
              required={false}
              color={color}
            />
            <Button text="Calcular" onClick={valueCheck} />
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className="flex justify-center w-full p-5 bg-neutral-100 dark:bg-neutral-950">
          <div className="w-full sm:max-w-3xl">
            <div className="w-full px-4 py-24 flex flex-col justify-center items-center">
              <h1 className="text-5xl text-center mb-4">
                Resolva exercícios <br /> matématicos
              </h1>
              <p className="text-center mb-12">
                Gere contas matemáticas infinitamente, <br /> resolva-as no menor tempo possível & <br />
                treine seu cálculo mental.
              </p>
              <div className="w-full sm:w-96">
                <Button onClick={() => navigate('/jogar')} text="Jogar" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Card title="Desafio" text="Resolva a máximo de questões possíveis antes do tempo acabar." />
              <Card title="Memória" text="Melhore seu cálculo mental, resolva aqueles contas chatas rapidamente." />
              <Card title="Satisfatório" text="Acertar diversas contas em seguida é extremamente satisfatório." />
            </div>
            <div className="w-full my-24">
              <PlayHome />
              <p className="mt-4">*Apenas uma demonstração.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

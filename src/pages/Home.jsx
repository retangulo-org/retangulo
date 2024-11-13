import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Card } from '../components/Card/index';
import InputCalc from '../components/InputCalc';
import Tag from '../components/Tag';

export default function Home() {
  const navigate = useNavigate();

  const PlayHome = () => {
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

    const calcContainer = {};

    calcContainer.calculo = math.n1 + math.n2;
    calcContainer.calculoString = `${math.n1} + ${math.n2}`;
    calcContainer.anterior = `${'\n'}${stored.n1} + ${stored.n2} = ${stored.n3}`;

    const valueCheck = () => {
      const value = calcContainer.calculo;

      if (input != value.toString()) {
        valueChange();
        setErros(erros + 1);
        setColor('red');
      }

      if (input === value.toString()) {
        valueChange();
        setPontos(pontos + 1);
        setColor('green');
      }
    };

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
      <div className="flex flex-col gap-4 items-center">
        <h1>{calcContainer.calculoString}</h1>
        <div className="flex flex-row gap-2 my-3 justify-center flex-wrap">
          <Tag text={pontos.toString()} tipo="pontos" />
          <Tag text={erros} tipo="erros" />
          <Tag text={calcContainer.anterior} tipo="anterior" />
        </div>
        <form className="flex flex-col gap-3 items-center w-full" onSubmit={handleSubmit}>
          <InputCalc
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Resultado..."
            required={false}
            color={color}
          />
          <Button onClick={valueCheck}>Calcular</Button>
        </form>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col justify-center gap-24 bg-neutral-100 dark:bg-neutral-950">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-5xl text-center mt-20 mb-4">
          Resolva exercícios <br /> matématicos
        </h1>
        <p className="text-center mb-12">
          Gere contas matemáticas infinitamente, <br /> resolva-as no menor tempo possível & <br />
          treine seu cálculo mental.
        </p>
        <div className="w-full sm:w-96">
          <Button onClick={() => navigate('/gerador')}>Jogar</Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Card.Root>
          <Card.Header>
            <Card.Title>Desafio</Card.Title>
            <Card.Description>Resolva a máximo de questões possíveis antes do tempo acabar.</Card.Description>
          </Card.Header>
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.Title>Memória</Card.Title>
            <Card.Description>Melhore seu cálculo mental, resolva aqueles contas chatas rapidamente.</Card.Description>
          </Card.Header>
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.Title>Satisfatório</Card.Title>
            <Card.Description>Acertar diversas contas em seguida é extremamente satisfatório.</Card.Description>
          </Card.Header>
        </Card.Root>
      </div>
      <div className="w-full">
        <PlayHome />
        <p className="mt-4">*Apenas uma demonstração.</p>
      </div>
    </div>
  );
}

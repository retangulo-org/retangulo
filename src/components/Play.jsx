import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Play() {
  const [input, setInput] = useState("");
  const [math, setMath] = useState({ n1: 0, n2: 0 });
  const [change, setChange] = useState(true);
  const [pontos, setPontos] = useState(0);
  const [erros, setErros] = useState(0);
  // const [color, setColor] = useState();
  const [stored, setStored] = useState({ n1: 0, n2: 0, n3: 0 });

  const { state } = useLocation();

  useEffect(() => {
    setMath({
      n1: handleRandomNumber(),
      n2: handleRandomNumber(),
    });
  }, [change]);

  function handleRandomNumber() {
    let maximo = state.maximo;
    if (state.type === "raiz2") {
      return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
    }
    if (state.negativo) {
      return Math.floor(Math.random() * (maximo - -maximo + 1)) + -maximo;
    } else {
      return Math.floor(Math.random() * (maximo - 1 + 1)) + 1;
    }
  }

  const calcContainer = new Object();

  function calculoStringNegativeFormat(number) {
    if (number < 0) {
      return `(${number})`;
    } else {
      return `${number}`;
    }
  }

  switch (state.type) {
    case "soma":
      calcContainer.calculo = math.n1 + math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(
        math.n1
      )} + ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `Anterior${"\n"}${stored.n1} + ${stored.n2} = ${
        stored.n3
      }`;
      break;
    case "subt":
      calcContainer.calculo = math.n1 - math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(
        math.n1
      )} - ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `Anterior${"\n"}${stored.n1} - ${stored.n2} = ${
        stored.n3
      }`;
      break;
    case "mult":
      calcContainer.calculo = math.n1 * math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(
        math.n1
      )} × ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `Anterior${"\n"}${stored.n1} × ${stored.n2} = ${
        stored.n3
      }`;
      break;
    case "divi":
      calcContainer.calculo = Number.isInteger(math.n1 / math.n2)
        ? math.n1 / math.n2
        : (math.n1 / math.n2).toFixed(2);
      calcContainer.calculoString = `${calculoStringNegativeFormat(
        math.n1
      )} ÷ ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `Anterior${"\n"}${stored.n1} ÷ ${stored.n2} = ${
        stored.n3
      }`;
      calcContainer.texto =
        "Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: 3÷2 = 1.5, 8÷3 = 2.67";
      break;
    case "raiz2":
      calcContainer.calculo = Number.isInteger(Math.sqrt(math.n1))
        ? Math.sqrt(math.n1)
        : Math.sqrt(math.n1).toFixed(2);
      calcContainer.calculoString = `√${math.n1}`;
      calcContainer.anterior = `Anterior${"\n"}√${stored.n1} = ${stored.n3}`;
      calcContainer.texto =
        "Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: √5 = 2.24, √10 = 3.16. Esse modo pode ter contas erradas!";
      break;
    case "expo2":
      calcContainer.calculo = math.n1 * math.n1;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n1)}²`;
      calcContainer.anterior = `Anterior${"\n"}${stored.n1}² = ${stored.n3}`;
      break;
    case "expo3":
      calcContainer.calculo = math.n2 * math.n2 * math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n2)}³`;
      calcContainer.anterior = `Anterior${"\n"}${stored.n2}³ = ${stored.n3}`;
      break;
  }

  function valueCheck() {
    const value = calcContainer.calculo;
    try {
      if (input != value) {
        // errado
        valueChange();
        setErros(erros + 1);
        // setColor(false);
      } else if (input == value) {
        // certo
        valueChange();
        setPontos(pontos + 1);
        // setColor(true);
      }
    } catch (e) {
      alert(e);
    }
  }

  function valueChange() {
    setChange(!change);
    setInput("");
    setStored({
      n1: calculoStringNegativeFormat(math.n1),
      n2: calculoStringNegativeFormat(math.n2),
      n3: calcContainer.calculo,
    });
    // setColor();
  }

  function ButtonCalc({ text }) {
    return (
      <button
        onClick={valueCheck}
        className="w-full h-14 text-white rounded-lg bg-blue-500 hover:bg-blue-800 active:bg-blue-700"
      >
        {text}
      </button>
    );
  }

  function Tag({ texto, tipo }) {
    if (tipo == "pontos") {
      return (
        <span className="p-1 bg-green-500 font-bold text-white rounded">
          {texto}
        </span>
      );
    } else if (tipo == "erros") {
      return (
        <span className="p-1 bg-red-500 font-bold text-white rounded">
          {texto}
        </span>
      );
    } else if (tipo == "anterior") {
      return (
        <span className="p-1 bg-blue-500 font-bold text-white rounded">
          {texto}
        </span>
      );
    }
  }

  function Calc() {
    return (
      <h1 className="text-4xl font-bold">{calcContainer.calculoString}</h1>
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-3 items-center p-5 w-screen">
        <Calc />
        <div className="flex-row space-x-3">
          <Tag texto={pontos} tipo="pontos" />
          <Tag texto={erros} tipo="erros" />
          <Tag texto={calcContainer.anterior} tipo="anterior" />
        </div>
        <form className="w-full sm:w-[460px] flex-col space-y-3 items-center">
          <input
            className="w-full h-20 rounded-lg border-4 text-center text-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            inputMode="numeric"
            autoFocus={true}
          />
          <div className="flex flex-col space-y-3">
            <ButtonCalc text="Calcular" />
          </div>
        </form>
        <Link to="/">Home</Link>
      </div>
    </>
  );
}

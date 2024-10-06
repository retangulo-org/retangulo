import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { InputCalc } from "./Input";

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
      calcContainer.anterior = `${"\n"}${stored.n1} + ${stored.n2} = ${
        stored.n3
      }`;
      break;
    case "subt":
      calcContainer.calculo = math.n1 - math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(
        math.n1
      )} - ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${"\n"}${stored.n1} - ${stored.n2} = ${
        stored.n3
      }`;
      break;
    case "mult":
      calcContainer.calculo = math.n1 * math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(
        math.n1
      )} × ${calculoStringNegativeFormat(math.n2)}`;
      calcContainer.anterior = `${"\n"}${stored.n1} × ${stored.n2} = ${
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
      calcContainer.anterior = `${"\n"}${stored.n1} ÷ ${stored.n2} = ${
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
      calcContainer.anterior = `${"\n"}√${stored.n1} = ${stored.n3}`;
      calcContainer.texto =
        "Máximo de 2 Casas Decimais depois do ponto (.) - padrão americano. Ex.: √5 = 2.24, √10 = 3.16. Esse modo pode ter contas erradas!";
      break;
    case "expo2":
      calcContainer.calculo = math.n1 * math.n1;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n1)}²`;
      calcContainer.anterior = `${"\n"}${stored.n1}² = ${stored.n3}`;
      break;
    case "expo3":
      calcContainer.calculo = math.n2 * math.n2 * math.n2;
      calcContainer.calculoString = `${calculoStringNegativeFormat(math.n2)}³`;
      calcContainer.anterior = `${"\n"}${stored.n2}³ = ${stored.n3}`;
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
        <span className="p-1 bg-green-500 font-bold text-white space-x-6 rounded">
          <i className="fa-solid fa-check"></i> {texto}
        </span>
      );
    } else if (tipo == "erros") {
      return (
        <span className="p-1 bg-red-500 font-bold text-white rounded">
          <i className="fa-solid fa-xmark"></i> {texto}
        </span>
      );
    } else if (tipo == "anterior") {
      return (
        <span className="p-1 bg-blue-500 font-bold text-white rounded">
          <i className="fa-solid fa-arrow-left"></i> {texto}
        </span>
      );
    }
  }

  function Calc() {
    return (
      <h1 className="text-4xl font-bold text-black dark:text-white">
        {calcContainer.calculoString}
      </h1>
    );
  }

  function LinkCalc({ text }) {
    const navigate = useNavigate();
    const handleConfirm = () => {
      const isConfirmed = window.confirm(
        "Você tem certeza que deseja voltar ao menu?"
      );

      if (isConfirmed) {
        console.log("voltar ao menu: ação confirmada!");
        return navigate("/");
      } else {
        return console.log("voltar ao menu: ação cancelada.");
      }
    };

    return (
      <button
        onClick={handleConfirm}
        className="w-full h-14 flex justify-center items-center text-white rounded-lg bg-red-500 hover:bg-red-800 active:bg-red-700"
      >
        {text}
      </button>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 items-center">
        <Calc />
        <div className="flex-row space-x-3 my-3">
          <Tag texto={pontos} tipo="pontos" />
          <Tag texto={erros} tipo="erros" />
          <Tag texto={calcContainer.anterior} tipo="anterior" />
        </div>
        <form className="flex flex-col gap-3 items-center w-full">
          <InputCalc value={input} onChange={(e) => setInput(e.target.value)} />
          <ButtonCalc text="Calcular" />
        </form>
        <LinkCalc text="Voltar" />
        <p className="text-black dark:text-white">{calcContainer.texto}</p>
      </div>
    </>
  );
}

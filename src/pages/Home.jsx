import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center gap-12">
        <h1 className="mt-16 text-4xl text-white font-bold">Gerador de cálculos matemáticos simplificado</h1>
        <Link
          to={`/jogar`}
          className="w-full h-14 flex justify-center items-center text-white rounded-lg hover:font-bold bg-blue-500 hover:bg-blue-800 active:bg-blue-700 select-none"
        >
          ACESSAR
        </Link>
      </div>
    </>
  );
}

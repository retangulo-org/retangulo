// import { Link } from "react-router-dom";
import logotipo from '../assets/logotipo.svg';

export default function Header() {
  return (
    <header className="h-16 p-4 flex justify-center items-center text-white font-bold text-3xl">
      <img className="w-24" src={logotipo} alt="Retângulo Logo" />
    </header>
  );
}

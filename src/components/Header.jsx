// import { Link } from "react-router-dom";

import logo from '../assets/logo.svg';

export default function Header() {
  return (
    <header className="h-16 bg-blue-600 flex justify-center items-center text-white font-bold text-3xl">
      <img className='w-28' src={logo} alt='Retângulo Logo' />
    </header>
  );
}

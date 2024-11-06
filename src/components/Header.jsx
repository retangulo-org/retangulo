import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogoTipo } from '../assets/LogoTipo';
import { AlignJustify, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Link = ({ link, children }) => {
    return (
      <NavLink
        to={link}
        className={({ isActive }) =>
          `${
            isActive
              ? 'bg-neutral-400 dark:bg-neutral-950'
              : 'dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'
          } w-full md:w-auto p-2 rounded-md hover:no-underline text-neutral-800 dark:text-neutral-200 hover:text-neutral-800 dark:hover:text-neutral-200 my-2`
        }>
        {children}
      </NavLink>
    );
  };

  return (
    <header className="bg-neutral-200 border-gray-200 dark:bg-neutral-800 p-4">
      <div className="w-full sm:max-w-3xl flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <LogoTipo className="w-20 h-auto fill-neutral-950 dark:fill-neutral-100" />
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 bg-neutral-50 dark:bg-neutral-950 justify-center text-sm text-neutral-500 rounded-lg md:hidden hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600 transition-all">
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? <X className="w-5 h-5" /> : <AlignJustify className="w-5 h-5" />}
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="font-medium w-full flex items-center flex-col md:space-y-0 mt-4 md:mt-0 md:p-0 md:flex-row md:space-x-8">
            <Link link="/menu">Jogar</Link>
            <Link link="/ui">Ui</Link>
            <Link link="/contato">Contato</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

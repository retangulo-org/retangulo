import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogoTipo } from '../assets/LogoTipo';
import { AlignJustify, X, House, Settings } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Link = ({ link, children }) => {
    return (
      <NavLink
        to={link}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={({ isActive }) =>
          `${
            isActive
              ? 'bg-neutral-950 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-950 cursor-default'
              : 'text-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-800 hover:bg-neutral-200'
          } w-full md:w-auto py-2 px-4 rounded-sm hover:no-underline flex flex-row gap-2 font-semibold`
        }>
        {children}
      </NavLink>
    );
  };

  return (
    <header className="border-b-2 border-foreground p-4">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center rtl:space-x-reverse">
          <span className="sr-only">Logo do site</span>
          <LogoTipo className="w-20 h-auto fill-neutral-950 dark:fill-neutral-100" />
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 bg-neutral-100 dark:bg-neutral-900 justify-center text-neutral-950 rounded-lg md:hidden hover:bg-neutral-50 dark:text-neutral-100 dark:hover:bg-neutral-950">
          <span className="sr-only">Abrir menu</span>
          {isMenuOpen ? <X className="w-10 h-10" /> : <AlignJustify className="w-10 h-10" />}
        </button>
        <div
          className={` overflow-hidden w-full md:w-auto ${
            isMenuOpen ? 'block opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'
          } md:opacity-100 md:max-h-full md:block`}>
          <div className="font-medium w-full flex items-center flex-col space-y-4 md:space-y-0 mt-4 md:mt-0 md:p-0 md:flex-row md:space-x-4 select-none">
            <Link link="/">
              <House />
              Início
            </Link>
            <Link link="/opcoes">
              <Settings />
              Opções
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

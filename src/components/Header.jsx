import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogoTipo } from '../assets/LogoTipo';
import { AlignJustify, X, House, Settings, BookText } from 'lucide-react';
import { Desktop, Mobile } from './ui/Responsive';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const Link = ({ link, children }) => {
    return (
      <NavLink
        to={link}
        end
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={({ isActive }) =>
          // TODO: Concertar as cores
          `${
            isActive ? '!actionDefault hover:text-neutral-950 cursor-default' : '!text-neutral-100 hover:bg-background'
          } w-full py-2 px-4 rounded-sm hover:no-underline flex flex-row gap-2 font-semibold`
        }>
        {children}
      </NavLink>
    );
  };

  function Links() {
    return (
      <>
        <Link link="/">
          <House />
          Início
        </Link>
        <Link link="/blog">
          <BookText />
          Blog
        </Link>
        <Link link="/options">
          <Settings />
          Opções
        </Link>
      </>
    );
  }

  function MobileMenu() {
    return (
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center rtl:space-x-reverse">
          <span className="sr-only">Logo do site</span>
          <LogoTipo className="w-20 h-auto fill-neutral-100" />
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className={`${isMenuOpen && 'bg-background'} inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg hover:bg-background text-neutral-100`}>
          <span className="sr-only">Abrir menu</span>
          {isMenuOpen ? <X className="w-12 h-12" /> : <AlignJustify className="w-12 h-12" />}
        </button>
        {isMenuOpen && (
          <div className="overflow-hidden w-full">
            <div className="font-medium mt-4 w-full flex items-center flex-col space-y-4 select-none">
              <Links />
            </div>
          </div>
        )}
      </div>
    );
  }

  function PcMenu() {
    return (
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center rtl:space-x-reverse">
          <span className="sr-only">Logo do site</span>
          <LogoTipo className="w-20 h-auto fill-neutral-100" />
        </button>
        <div className="w-auto">
          <div className="font-medium w-full flex flex-row items-center justify-between gap-4 select-none">
            <Links />
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className="bg-foreground p-4">
      <Desktop>
        <PcMenu />
      </Desktop>
      <Mobile>
        <MobileMenu />
      </Mobile>
    </header>
  );
}

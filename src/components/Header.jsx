import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { LogoTipo } from '../assets/LogoTipo';
import { AlignJustify, X, House, Settings } from 'lucide-react';
import { Desktop, Mobile } from './ui/Responsive';
import Button from './ui/Button';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  const Link = ({ link, children }) => {
    return (
      <NavLink
        to={link}
        end
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={({ isActive }) =>
          `${
            isActive ? 'actionDefault cursor-default' : 'text-neutral-100 hover:bg-background'
          } w-full py-2 px-4 rounded-sm hover:no-underline flex flex-row gap-2 font-semibold`
        }>
        {children}
      </NavLink>
    );
  };

  function Links() {
    return (
      <>
        <Link link={`/${currentLang}`}>
          <House />
          {t('bHome')}
        </Link>
        <Link link={`/${currentLang}/options`}>
          <Settings />
          {t('bOptions')}
        </Link>
      </>
    );
  }

  function MobileMenu() {
    return (
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        <button onClick={() => navigate(`/${currentLang}`)} className="flex items-center rtl:space-x-reverse">
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
        <button onClick={() => navigate(`/${currentLang}`)} className="flex items-center rtl:space-x-reverse">
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

  const SUPPORTED_LANGS = ['pt', 'en'];

  function SwitchToBrowserLang() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const { lang } = useParams();
    const [visible, setVisible] = useState(() => {
      return localStorage.getItem('visible') || 'visible';
    });

    useEffect(() => {
      localStorage.setItem('visible', visible);
    }, [visible]);

    const browserLang = navigator.language.split('-')[0];
    const validBrowserLang = SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';

    if (lang === validBrowserLang) return null;

    const handleClick = () => {
      i18n.changeLanguage(validBrowserLang);
      navigate(`/${validBrowserLang}`, { replace: true });
    };

    return (
      <>
        {visible === 'visible' && (
          <div className="flex flex- mb-4">
            <button
              className="w-full flex flex-row justify-start items-center gap-2 py-2 px-4 bg-primary  text-text rounded-l-md"
              onClick={handleClick}>
              {t('tClickToChangeLanguageToEnglish')}
            </button>
            <Button className="rounded-l-none" variant="default" size="icon" onClick={() => setVisible('NotVisible')}>
              <X />
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <header className="bg-foreground p-4">
      <SwitchToBrowserLang />
      <Desktop>
        <PcMenu />
      </Desktop>
      <Mobile>
        <MobileMenu />
      </Mobile>
    </header>
  );
}

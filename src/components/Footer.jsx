import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <footer className="w-full h-auto px-6 py-12 flex justify-center items-center text-white ">
      <div className="w-full sm:max-w-2xl flex flex-col justify-center sm:justify-between items-center gap-8 sm:gap-4">
        <img className="w-48" src={logo} alt="Retângulo Logo" />
        <div className="flex flex-row gap-4">
          <span>
            <a href="http://github.com/Retangulo-org" className="hover:underline" target="_blank">
              Github
            </a>
          </span>
          <span>
            <a href="mailto:contato@retangulo.org" className="hover:underline" target="_blank">
              Contato
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

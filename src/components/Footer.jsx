export default function Footer() {
  return (
    <footer className="w-full h-auto px-6 py-12 flex justify-center items-center text-white ">
      <div className="w-full sm:max-w-2xl">
        <h2 className="font-bold text-3xl mb-4">
          <a href="/">Retangulo.org</a>
        </h2>
        <div className="space-x-4">

        <span>
          <a
            href="http://github.com/Retangulo-org"
            className="hover:underline"
            target="_blank"
          >
            Github
          </a>
        </span>
        <span>
          <a
            href="mailto:contato@retangulo.org"
            className="hover:underline"
            target="_blank"
            >
            Contato
          </a>
        </span>
            </div>
      </div>
    </footer>
  );
}

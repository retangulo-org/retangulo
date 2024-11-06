export default function ErrorPage() {
  return (
    <main className="flex justify-center w-full p-5 bg-neutral-100 dark:bg-neutral-950">
      <div className="flex flex-col w-full sm:max-w-3xl h-[80vh] gap-5 justify-center items-center text=black dark:text-white">
        <h1 className="text-7xl font-bold">Erro 404</h1>
        <a href="/menu" className="w-full p-4 bg-blue-600 text-white text-center rounded-md">
          Menu principal
        </a>
      </div>
    </main>
  );
}

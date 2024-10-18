export default function Modal({ children }) {
  return (
    <>
      <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 flex justify-center items-center z-50 select-none">
        <div className="bg-neutral-100 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100 p-6 m-4 rounded-lg shadow-lg relative max-w-md w-full">
          {children}
        </div>
      </div>
    </>
  );
}

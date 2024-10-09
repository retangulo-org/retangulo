export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-black text-black dark:text-white p-6 m-4 rounded-lg shadow-lg relative max-w-md w-full">
        {children}
      </div>
    </div>
  );
}
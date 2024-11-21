import React from 'react';

export default function Root({ children, isOpen }) {
  return (
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 z-0'}`}>
      {isOpen && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 flex justify-center items-center z-50 select-none">
          <div className="bg-background text-text p-6 m-4 rounded-lg shadow-lg relative max-w-xl w-full">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

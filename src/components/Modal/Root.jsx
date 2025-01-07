import React from 'react';

export default function Root({ children, isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 flex justify-center items-center z-50 select-none">
          <div className="bg-background text-text p-6 m-6 rounded-lg shadow-lg relative max-w-xl w-[95%]">
            {children}
          </div>
        </div>
      )}
    </>
  );
}

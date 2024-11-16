import React from 'react';

export default function Content({ children }) {
  return (
    <div className="flex flex-col mb-6">
      {children}
    </div>
  );
}

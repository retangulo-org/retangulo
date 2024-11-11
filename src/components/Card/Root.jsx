import React from 'react';

export default function Root({ children }) {
  return (
    <section className="w-full p-4 bg-neutral-200 dark:bg-neutral-800 border border-border rounded-lg">
      {children}
    </section>
  );
}

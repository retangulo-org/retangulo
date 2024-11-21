import React, { useContext } from 'react';
import { RootContext } from './Root';
import { motion } from 'framer-motion';

export default function Content({ children, className }) {
  const { isOpen } = useContext(RootContext);

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: isOpen ? 'auto' : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}>
      <div className={`${className} p-4`}>{children}</div>
    </motion.div>
  );
}

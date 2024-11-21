import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 0,
  },

  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    scale: 0.96,
    y: 0,
  },
};

export default function Transition({ children, className }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'tween', duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
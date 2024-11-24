import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },
};

export default function Transition({ children, className }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{ type: 'tween', duration: 0.5 }}
      className={className}>
      {children}
    </motion.div>
  );
}

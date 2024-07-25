import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';



interface ButtonProps {
  variant: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ variant, children }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className={`px-4 py-2 rounded-md transition-all duration-300 ${variant} border-2 border-transparent hover:border-white`}
  >
    {children}
  </motion.button>
);
export default Button;

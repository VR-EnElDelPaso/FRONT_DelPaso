import { motion } from "framer-motion";
import MuviLogo from "@/assets/svgs/MUVI-logo-dark.svg";

const Loader = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center dark:bg-gray-900/90 backdrop-blur-md z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <img 
          src={MuviLogo} 
          className="h-32 w-auto" 
          alt="Muvi Logo" 
        />
      </motion.div>
      
      <motion.div 
        className="mt-8 relative h-0.5 w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      >
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: "0%" }}
          animate={{ 
            width: "100%",
            transition: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }
          }}
        />
      </motion.div>
      
      <motion.p
        className="mt-6 text-gray-600 dark:text-gray-300 font-medium text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Cargando contenido...
      </motion.p>
    </motion.div>
  );
};

export default Loader;

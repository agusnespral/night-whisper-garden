import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <motion.div
        className="max-w-sm text-center space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-light tracking-wide text-foreground">
            CONTINUARÁ
          </h1>
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            Un espacio para la noche.
          </p>
        </div>

        <motion.div
          className="space-y-6 text-muted-foreground leading-relaxed text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
        >
          <p>
            Antes de dormir,
            <br />
            podés disponerte.
          </p>
          <p>
            Al despertar,
            <br />
            registrar lo que aparezca.
          </p>
          <p className="text-whisper text-xs">
            No hace falta entender.
            <br />
            Solo dejar lugar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <button
            onClick={onStart}
            className="px-8 py-3 border border-border rounded-sm text-sm text-foreground hover:border-primary hover:text-primary transition-colors duration-500 tracking-wider"
          >
            Empezar
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;

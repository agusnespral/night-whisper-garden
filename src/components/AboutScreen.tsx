import { motion } from 'framer-motion';

const AboutScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 pb-24">
      <motion.div
        className="max-w-sm text-center space-y-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-serif font-light text-foreground">
          Sobre CONTINUARÁ
        </h2>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Esta app no interpreta sueños.
            <br />
            No los explica.
            <br />
            No los mide.
          </p>
          <p>
            Es un espacio para disponerse
            <br />
            y registrar.
          </p>
          <p className="text-whisper text-xs">
            Nada más.
            <br />
            Nada menos.
          </p>
        </div>

        <div className="pt-4">
          <p className="text-xs text-whisper animate-breathe">🌙</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutScreen;

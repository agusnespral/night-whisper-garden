import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MorningScreenProps {
  onSave: (content: string, title?: string) => void;
}

const MorningScreen = ({ onSave }: MorningScreenProps) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!content.trim()) return;
    onSave(content.trim(), title.trim() || undefined);
    setContent('');
    setTitle('');
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 pb-24">
        <motion.div
          className="max-w-sm text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-serif font-light text-foreground">
            Escena guardada.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            No hace falta volver.
            <br />
            Pero podés hacerlo cuando quieras.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSaved(false)}
              className="px-6 py-2 border border-border rounded-sm text-sm text-foreground hover:border-primary hover:text-primary transition-colors duration-500"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24">
      <motion.div
        className="max-w-sm w-full space-y-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-serif font-light text-foreground">
            Al despertar
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Escribí lo que recuerdes.
            <br />
            Aunque sea poco.
            <br />
            Aunque sea incompleto.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título (opcional)"
            className="w-full bg-transparent border-b border-border px-0 py-2 text-sm text-foreground placeholder:text-whisper focus:outline-none focus:border-primary transition-colors duration-500 font-serif"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"Una imagen.\nUn gesto.\nUn fragmento.\nO nada."}
            rows={8}
            className="w-full bg-transparent border border-border rounded-sm p-4 text-sm text-foreground placeholder:text-whisper focus:outline-none focus:border-primary transition-colors duration-500 resize-none leading-relaxed"
          />
        </div>

        <p className="text-xs text-whisper text-center">
          No busques sentido ahora.
        </p>

        <AnimatePresence>
          {content.trim() && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={handleSave}
                className="px-8 py-3 border border-border rounded-sm text-sm text-foreground hover:border-primary hover:text-primary transition-colors duration-500 tracking-wider"
              >
                Guardar escena
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MorningScreen;

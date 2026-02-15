import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Dream } from '@/types/dream';

const toRoman = (n: number): string => {
  const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (n >= vals[i]) {
      result += syms[i];
      n -= vals[i];
    }
  }
  return result;
};

interface ArchiveScreenProps {
  dreams: Dream[];
  onUpdate: (id: string, updates: Partial<Pick<Dream, 'content' | 'title'>>) => void;
  onDelete: (id: string) => void;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
};

const ArchiveScreen = ({ dreams, onUpdate, onDelete }: ArchiveScreenProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const selected = dreams.find(d => d.id === selectedId);
  const totalDreams = dreams.length;

  const startEdit = () => {
    if (!selected) return;
    setEditContent(selected.content);
    setEditTitle(selected.title || '');
    setEditing(true);
  };

  const saveEdit = () => {
    if (!selected || !editContent.trim()) return;
    onUpdate(selected.id, {
      content: editContent.trim(),
      title: editTitle.trim() || undefined,
    });
    setEditing(false);
  };

  // Scene detail view
  if (selected) {
    const sceneNumber = totalDreams - dreams.indexOf(selected);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24">
        <motion.div
          className="max-w-sm w-full space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-serif font-light text-foreground">
              Escena {toRoman(sceneNumber)}
            </h2>
            <p className="text-xs text-muted-foreground">
              {formatDate(selected.createdAt)} · {formatTime(selected.createdAt)}
            </p>
          </div>

          {editing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Título (opcional)"
                className="w-full bg-transparent border-b border-border px-0 py-2 text-sm text-foreground placeholder:text-whisper focus:outline-none focus:border-primary transition-colors duration-500 font-serif"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={8}
                className="w-full bg-transparent border border-border rounded-sm p-4 text-sm text-foreground focus:outline-none focus:border-primary transition-colors duration-500 resize-none leading-relaxed"
              />
              <div className="flex gap-4 justify-center">
                <button
                  onClick={saveEdit}
                  className="px-6 py-2 border border-primary rounded-sm text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-500"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              {selected.title && (
                <p className="text-center font-serif text-lg text-foreground">
                  {selected.title}
                </p>
              )}
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {selected.content}
              </p>
              <p className="text-xs text-whisper text-center">
                Esto no necesita ser interpretado.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={startEdit}
                  className="px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => setSelectedId(null)}
                  className="px-6 py-2 border border-border rounded-sm text-sm text-foreground hover:border-primary hover:text-primary transition-colors duration-500"
                >
                  Cerrar
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  // Archive list
  return (
    <div className="min-h-screen flex flex-col items-center px-8 pt-16 pb-24">
      <motion.div
        className="max-w-sm w-full space-y-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-serif font-light text-foreground">
            Escenas
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cada registro es una escena.
            <br />
            No forman un todo.
            <br />
            No buscan cerrar.
          </p>
        </div>

        {dreams.length === 0 ? (
          <motion.div
            className="text-center space-y-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-muted-foreground">
              Todavía no hay escenas.
            </p>
            <p className="text-xs text-whisper">
              No pasa nada.
              <br />
              La noche también es eso.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {dreams.map((dream, index) => {
                const sceneNumber = totalDreams - index;
                return (
                  <motion.button
                    key={dream.id}
                    onClick={() => setSelectedId(dream.id)}
                    className="w-full text-left px-4 py-4 border border-border rounded-sm hover:border-primary/40 transition-colors duration-500 group"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-serif text-foreground group-hover:text-primary transition-colors duration-500">
                        Escena {toRoman(sceneNumber)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(dream.createdAt)}
                      </span>
                    </div>
                    {dream.title && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {dream.title}
                      </p>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ArchiveScreen;

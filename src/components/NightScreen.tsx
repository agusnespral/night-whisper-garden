import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

type AudioState = 'idle' | 'playing' | 'paused' | 'finished';

const MEDITATION_DURATION = 360; // 6 minutes in seconds

const NightScreen = () => {
  const [state, setState] = useState<AudioState>('idle');
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startPlaying = () => {
    setState('playing');
    intervalRef.current = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= MEDITATION_DURATION) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setState('finished');
          return MEDITATION_DURATION;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const togglePlay = () => {
    if (state === 'idle' || state === 'finished') {
      setProgress(0);
      startPlaying();
    } else if (state === 'playing') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setState('paused');
    } else if (state === 'paused') {
      startPlaying();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const statusText = () => {
    switch (state) {
      case 'playing': return 'Reproduciendo…';
      case 'paused': return 'Pausa';
      case 'finished': return 'Finalizó';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 pb-24">
      <motion.div
        className="max-w-sm w-full text-center space-y-12"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-light text-foreground">
            Antes de dormir
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            No te propongas nada.
            <br />
            No esperes nada.
          </p>
          <p className="text-sm text-foreground">Escuchá.</p>
        </div>

        {/* Audio player */}
        <div className="space-y-6">
          <button
            onClick={togglePlay}
            className="mx-auto w-16 h-16 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors duration-500"
          >
            {state === 'playing' ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>

          {state !== 'idle' && (
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs text-muted-foreground tracking-wider">
                {statusText()}
              </p>
              {/* Progress bar */}
              <div className="w-full max-w-xs mx-auto h-px bg-border relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary"
                  style={{ width: `${(progress / MEDITATION_DURATION) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-whisper font-mono">
                {formatTime(progress)} / {formatTime(MEDITATION_DURATION)}
              </p>
            </motion.div>
          )}
        </div>

        <p className="text-xs text-whisper leading-relaxed">
          Si no te dormís, está bien.
          <br />
          La noche no exige.
        </p>
      </motion.div>
    </div>
  );
};

export default NightScreen;

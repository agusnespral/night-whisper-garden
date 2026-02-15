import { useState, useCallback, useEffect } from 'react';
import type { Dream } from '@/types/dream';

const STORAGE_KEY = 'continuara_dreams';

function loadDreams(): Dream[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDreams(dreams: Dream[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
}

export function useDreams() {
  const [dreams, setDreams] = useState<Dream[]>(loadDreams);

  useEffect(() => {
    saveDreams(dreams);
  }, [dreams]);

  const addDream = useCallback((content: string, title?: string) => {
    const dream: Dream = {
      id: crypto.randomUUID(),
      content,
      title,
      createdAt: new Date().toISOString(),
    };
    setDreams(prev => [dream, ...prev]);
    return dream;
  }, []);

  const updateDream = useCallback((id: string, updates: Partial<Pick<Dream, 'content' | 'title'>>) => {
    setDreams(prev =>
      prev.map(d =>
        d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
      )
    );
  }, []);

  const deleteDream = useCallback((id: string) => {
    setDreams(prev => prev.filter(d => d.id !== id));
  }, []);

  return { dreams, addDream, updateDream, deleteDream };
}

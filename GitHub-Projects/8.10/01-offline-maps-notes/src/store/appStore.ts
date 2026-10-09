import { create } from 'zustand';

export interface Note {
  id: string;
  title: string;
  content: string;
  lat: number;
  lng: number;
  createdAt: number;
  updatedAt: number;
  tags: string[];
}

interface AppState {
  notes: Note[];
  selectedNote: Note | null;
  isAddMode: boolean;
  addLat: number | null;
  addLng: number | null;
  searchQuery: string;
  offline: boolean;
  setOffline: (status: boolean) => void;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  selectNote: (note: Note | null) => void;
  setAddMode: (enabled: boolean) => void;
  setAddLocation: (lat: number, lng: number) => void;
  setSearchQuery: (query: string) => void;
  saveNotes: () => Promise<void>;
  loadNotes: () => Promise<void>;
}

const STORAGE_KEY = 'geonotes_data';

const defaultNotes: Note[] = [];

export const useAppStore = create<AppState>((set, get) => ({
  notes: defaultNotes,
  selectedNote: null,
  isAddMode: false,
  addLat: null,
  addLng: null,
  searchQuery: '',
  offline: false,
  setOffline: (offline) => set({ offline }),
  setNotes: (notes) => set({ notes }),
  addNote: (note) =>
    set((state) => {
      const updated = [...state.notes, note];
      return { notes: updated, selectedNote: note, isAddMode: false };
    }),
  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      selectedNote: state.selectedNote?.id === id ? null : state.selectedNote,
    })),
  selectNote: (note) => set({ selectedNote: note, isAddMode: false }),
  setAddMode: (enabled) => set({ isAddMode: enabled }),
  setAddLocation: (lat, lng) => set({ addLat: lat, addLng: lng }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  saveNotes: async () => {
    const { notes } = get();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Storage full or unavailable — keep in memory
    }
  },
  loadNotes: async () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        set({ notes: JSON.parse(data) });
      }
    } catch {
      // Corrupted data — start fresh
    }
  },
}));

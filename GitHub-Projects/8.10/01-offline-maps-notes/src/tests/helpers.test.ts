import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateId, sanitizeTitle, sanitizeContent, formatRelativeTime, isValidLat, isValidLng, distanceBetween, filterNotes } from '../utils/helpers';
import { useAppStore } from '../store/appStore';
import { Note } from '../utils/helpers';

describe('helpers', () => {
  it('generates unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
    expect(id1.length).toBeGreaterThan(0);
  });

  it('sanitizes title by trimming and removing angle brackets', () => {
    expect(sanitizeTitle('  Hello <World>  ')).toBe('Hello World');
  });

  it('sanitizes content by removing script tags', () => {
    const malicious = '<script>alert(1)</script>Hello';
    expect(sanitizeContent(malicious)).toBe('Hello');
  });

  it('validates latitude', () => {
    expect(isValidLat(45)).toBe(true);
    expect(isValidLat(91)).toBe(false);
    expect(isValidLat(NaN)).toBe(false);
    expect(isValidLat(-90)).toBe(true);
  });

  it('validates longitude', () => {
    expect(isValidLng(180)).toBe(true);
    expect(isValidLng(-180)).toBe(true);
    expect(isValidLng(181)).toBe(false);
  });

  it('formats relative time for 5 minutes ago', () => {
    const past = Date.now() - 5 * 60 * 1000;
    const result = formatRelativeTime(past);
    expect(result).toContain('5m ago');
  });

  it('formats relative time for just now', () => {
    const result = formatRelativeTime(Date.now());
    expect(result).toBe('just now');
  });

  it('calculates distance between coordinates', () => {
    const dist = distanceBetween(0, 0, 0, 1);
    expect(dist).toBeGreaterThan(100e3);
    expect(dist).toBeLessThan(200e3);
  });

  it('returns zero distance for same coordinates', () => {
    expect(distanceBetween(45, -93, 45, -93)).toBe(0);
  });

  it('filters notes by title query', () => {
    const notes: Note[] = [
      { id: '1', title: 'Park Note', content: 'Nice trees', tags: ['outdoor'], lat: 0, lng: 0, createdAt: 0, updatedAt: 0 },
      { id: '2', title: 'Office', content: 'Work stuff', tags: [], lat: 0, lng: 0, createdAt: 0, updatedAt: 0 },
    ];
    const filtered = filterNotes(notes, 'park');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Park Note');
  });

  it('filters notes by tag query', () => {
    const notes: Note[] = [
      { id: '1', title: 'Hike', content: 'Trail', tags: ['outdoor'], lat: 0, lng: 0, createdAt: 0, updatedAt: 0 },
      { id: '2', title: 'Grocery', content: 'Milk', tags: ['indoor'], lat: 0, lng: 0, createdAt: 0, updatedAt: 0 },
    ];
    const filtered = filterNotes(notes, 'outdoor');
    expect(filtered).toHaveLength(1);
  });

  it('filterNotes returns all when query is empty', () => {
    const notes: Note[] = [
      { id: '1', title: 'a', content: 'b', tags: [], lat: 0, lng: 0, createdAt: 0, updatedAt: 0 },
      { id: '2', title: 'c', content: 'd', tags: [], lat: 0, lng: 0, createdAt: 0, updatedAt: 0 },
    ];
    expect(filterNotes(notes, '')).toHaveLength(2);
  });

  it('filterNotes returns empty for no match', () => {
    const notes: Note[] = [
      { id: '1', title: 'a', content: 'b', tags: [], lat: 0, lng: 0, createdAt: 0, updatedAt: 0 },
    ];
    expect(filterNotes(notes, 'zxyz')).toHaveLength(0);
  });
});

describe('appStore', () => {
  beforeEach(() => {
    const storage = {};
    vi.spyOn(localStorage, 'getItem').mockImplementation((key) => storage[key] || null);
    vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
      storage[key] = value.toString();
    });
    vi.spyOn(localStorage, 'clear').mockImplementation(() => {
      Object.keys(storage).forEach(key => delete storage[key]);
    });
    useAppStore.setState({ notes: [], selectedNote: null, isAddMode: false, addLat: null, addLng: null, searchQuery: '', offline: false });
  });

  it('loads empty notes when no data stored', async () => {
    const store = useAppStore.getState();
    await store.loadNotes();
    expect(store.notes).toEqual([]);
  });

  it('saves and loads notes from localStorage', async () => {
    const note: Note = {
      id: 'test-id', title: 'Test', content: 'Content', lat: 10, lng: 20,
      createdAt: Date.now(), updatedAt: Date.now(), tags: []
    };
    localStorage.setItem('geonotes_data', JSON.stringify([note]));
    const store = useAppStore.getState();
    await store.loadNotes();
    expect(store.notes).toHaveLength(1);
    expect(store.notes[0].title).toBe('Test');
  });

  it('adds a note and updates list and selectedNote', () => {
    const store = useAppStore;
    const note: Note = {
      id: 'new-id', title: 'New', content: 'Notes', lat: 0, lng: 0,
      createdAt: Date.now(), updatedAt: Date.now(), tags: []
    };
    store.getState().addNote(note);
    expect(store.getState().notes).toHaveLength(1);
    expect(store.getState().selectedNote).toEqual(note);
    expect(store.getState().isAddMode).toBe(false);
  });

  it('updates a note by id', () => {
    const store = useAppStore;
    const initial: Note = { id: '1', title: 'Old', content: '', lat: 0, lng: 0, createdAt: 0, updatedAt: 0, tags: [] };
    store.setState({ notes: [initial] });
    store.getState().updateNote('1', { title: 'Updated' });
    expect(store.getState().notes[0].title).toBe('Updated');
    expect(store.getState().notes[0].updatedAt).toBeGreaterThan(0);
  });

  it('deletes a note by id', () => {
    const store = useAppStore;
    const notes: Note[] = [
      { id: '1', title: 'Keep', content: '', lat: 0, lng: 0, createdAt: 0, updatedAt: 0, tags: [] },
      { id: '2', title: 'Remove', content: '', lat: 0, lng: 0, createdAt: 0, updatedAt: 0, tags: [] },
    ];
    store.setState({ notes });
    store.getState().deleteNote('2');
    expect(store.getState().notes).toHaveLength(1);
    expect(store.getState().notes[0].id).toBe('1');
  });

  it('clears selectedNote when deleting selected note', () => {
    const store = useAppStore;
    const note: Note = { id: '1', title: 'Sel', content: '', lat: 0, lng: 0, createdAt: 0, updatedAt: 0, tags: [] };
    store.setState({ notes: [note], selectedNote: note });
    store.getState().deleteNote('1');
    expect(store.getState().selectedNote).toBeNull();
    expect(store.getState().notes).toHaveLength(0);
  });

  it('sets offline status', () => {
    const store = useAppStore.getState();
    store.setOffline(true);
    expect(store.offline).toBe(true);
    store.setOffline(false);
    expect(store.offline).toBe(false);
  });

  it('selects a note and disables add mode', () => {
    const store = useAppStore;
    const note: Note = { id: '1', title: 'Sel', content: '', lat: 0, lng: 0, createdAt: 0, updatedAt: 0, tags: [] };
    store.getState().selectNote(note);
    expect(store.getState().selectedNote).toEqual(note);
    expect(store.getState().isAddMode).toBe(false);
  });
});
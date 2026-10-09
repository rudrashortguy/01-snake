import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { filterNotes, formatRelativeTime, formatCoordinates } from '../utils/helpers';

export default function NoteList() {
  const { notes, selectedNote, selectNote, searchQuery, setSearchQuery } = useAppStore();
  const filtered = filterNotes(notes, searchQuery);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('note-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <aside className="note-list">
      <input
        id="note-search"
        type="text"
        placeholder="Search notes (⌘K)…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="note-count">{filtered.length} note{filtered.length !== 1 ? 's' : ''}</div>
      <ul className="note-items">
        {filtered.map((note) => (
          <li
            key={note.id}
            className={`note-item ${selectedNote?.id === note.id ? 'selected' : ''}`}
            onClick={() => selectNote(note)}
          >
            <div className="note-item-title">{note.title || 'Untitled'}</div>
            <div className="note-item-preview">{note.content.slice(0, 60)}</div>
            <div className="note-item-meta">
              <span>{formatRelativeTime(note.createdAt)}</span>
              <span>{formatCoordinates(note.lat, note.lng)}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

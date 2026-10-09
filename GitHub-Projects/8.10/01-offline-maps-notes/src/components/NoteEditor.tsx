import { useEffect, useState } from 'react';
import { useAppStore } from '../store/appStore';
import { generateId, sanitizeTitle, sanitizeContent, isValidLat, isValidLng } from '../utils/helpers';
import { useToastStore } from '../store/toastStore';

export default function NoteEditor() {
  const { selectedNote, isAddMode, addLat, addLng, addNote, updateNote, deleteNote, saveNotes } = useAppStore();
  const { addToast } = useToastStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setLat(selectedNote.lat);
      setLng(selectedNote.lng);
      setTags(selectedNote.tags.join(', '));
    } else if (isAddMode && addLat !== null && addLng !== null) {
      setTitle('');
      setContent('');
      setLat(addLat);
      setLng(addLng);
      setTags('');
    }
  }, [selectedNote, isAddMode, addLat, addLng]);

  const handleSave = () => {
    if (lat === null || lng === null) {
      addToast('Please tap the map to select a location', 'error');
      return;
    }
    if (!isValidLat(lat) || !isValidLng(lng)) {
      addToast('Invalid coordinates', 'error');
      return;
    }

    const titleText = sanitizeTitle(title);
    const contentText = sanitizeContent(content);
    const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean);

    if (selectedNote) {
      updateNote(selectedNote.id, { title: titleText, content: contentText, lat, lng, tags: tagList });
      addToast('Note updated', 'success');
    } else {
      const note = {
        id: generateId(),
        title: titleText,
        content: contentText,
        lat,
        lng,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tags: tagList,
      };
      addNote(note);
      addToast('Note saved', 'success');
    }
    saveNotes();
  };

  const handleDelete = () => {
    if (!selectedNote) return;
    deleteNote(selectedNote.id);
    saveNotes();
    addToast('Note deleted', 'info');
  };

  if (!selectedNote && !isAddMode) return null;

  return (
    <div className="note-editor">
      <h2>{selectedNote ? 'Edit Note' : 'New Note'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="editor-field"
      />
      <textarea
        placeholder="Write your note…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="editor-textarea"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="editor-field"
      />
      {lat !== null && lng !== null && (
        <div className="location-display">
          📍 {lat.toFixed(4)}, {lng.toFixed(4)}
        </div>
      )}
      <div className="editor-actions">
        <button onClick={handleSave} className="btn-primary">Save</button>
        {selectedNote && (
          <button onClick={handleDelete} className="btn-danger">Delete</button>
        )}
      </div>
    </div>
  );
}

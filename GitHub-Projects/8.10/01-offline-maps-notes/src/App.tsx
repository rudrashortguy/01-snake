import { useEffect } from 'react';
import { useAppStore } from './store/appStore';
import MapView from './components/MapView';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import InstallPrompt from './components/InstallPrompt';
import ToastContainer from './components/ToastContainer';
import './styles/main.css';

export default function App() {
  const { offline, setOffline, loadNotes } = useAppStore();

  useEffect(() => {
    loadNotes();
    setOffline(!navigator.onLine);

    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadNotes, setOffline]);

  return (
    <div className="app">
      {offline && (
        <div className="offline-banner">Offline mode — data saved locally</div>
      )}
      <header className="app-header">
        <h1>GeoNotes</h1>
        <span className="subtitle">Offline Geo-Tagged Notes</span>
      </header>
      <main className="app-main">
        <MapView />
        <NoteList />
        <NoteEditor />
      </main>
      <InstallPrompt />
      <ToastContainer />
    </div>
  );
}

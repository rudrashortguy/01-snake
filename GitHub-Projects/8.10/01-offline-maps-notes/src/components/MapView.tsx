import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '../store/appStore';

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { notes, selectedNote, setAddMode, setAddLocation, selectNote } = useAppStore();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const map = L.map(mapRef.current).setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
    mapInstanceRef.current = map;

    map.on('click', (e: L.LeafletMouseEvent) => {
      setAddMode(true);
      setAddLocation(e.latlng.lat, e.latlng.lng);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    notes.forEach((note) => {
      const marker = L.marker([note.lat, note.lng]).addTo(map);
      marker.bindPopup(`<b>${note.title}</b><br>${note.content.slice(0, 80)}...`);
      marker.on('click', () => selectNote(note));
    });
  }, [notes, selectNote]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedNote) return;
    map.flyTo([selectedNote.lat, selectedNote.lng], 14, { duration: 0.5 });
  }, [selectedNote]);

  return (
    <div className="map-container" ref={mapRef}>
      {!notes.length && (
        <div className="map-placeholder">
          Tap the map to add a note at a location
        </div>
      )}
    </div>
  );
}

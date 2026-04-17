import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function TreatmentHistoryViewer({ custId }) {
  const [sessions, setSessions] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('photo_sessions')
        .select(`
          *,
          packages(name, emoji)
        `)
        .eq('cust_id', custId)
        .order('date', { ascending: false });
      setSessions(data || []);
    };
    load();
  }, [custId]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6">📋 Lịch sử điều trị</h3>
      {sessions.map(session => (
        <div key={session.id} className="bg-white rounded-3xl p-6 shadow mb-6">
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{session.packages?.emoji}</span>
              <div className="font-semibold">{session.packages?.name}</div>
            </div>
            <div className="text-xs text-gray-400">{session.date}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {session.before_img && <img src={session.before_img} className="rounded-3xl cursor-pointer" onClick={() => setLightbox(session.before_img)} />}
            {session.after_img && <img src={session.after_img} className="rounded-3xl cursor-pointer" onClick={() => setLightbox(session.after_img)} />}
          </div>
        </div>
      ))}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} className="max-w-full max-h-full rounded-3xl" />
        </div>
      )}
    </div>
  );
}

export default TreatmentHistoryViewer;
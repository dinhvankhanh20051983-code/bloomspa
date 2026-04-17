import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Calendar, Camera } from 'lucide-react';

export default function TreatmentHistoryViewer() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, services(name), photo_sessions(*)')
      .order('date', { ascending: false });

    if (error) console.error(error);
    else setHistory(data || []);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <Camera className="w-8 h-8" />
        Lịch sử trị liệu & Ảnh trước/sau
      </h1>

      <div className="space-y-6">
        {history.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-400">
            Chưa có lịch sử trị liệu
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-6 shadow">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{item.services?.name}</div>
                  <div className="text-sm text-gray-500">{item.date} • {item.time}</div>
                </div>
                <div className="text-xs bg-purple-100 text-purple-700 px-4 py-1 rounded-3xl self-start">
                  Hoàn thành
                </div>
              </div>
              {item.photo_sessions && item.photo_sessions.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {item.photo_sessions.map((photo, idx) => (
                    <img key={idx} src={photo.url} alt="Before/After" className="rounded-2xl" />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
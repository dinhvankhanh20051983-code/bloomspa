import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { Calendar, Camera } from 'lucide-react';

export default function CustomerTreatmentHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, services(name)')
      .order('date', { ascending: false });

    if (error) console.error(error);
    else setHistory(data || []);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 flex items-center gap-3">
        <Calendar className="w-8 h-8" />
        Lịch sử trị liệu của tôi
      </h1>

      <div className="space-y-6">
        {history.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-400">
            Chưa có buổi trị liệu nào
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-6 shadow">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{item.services?.name}</div>
                  <div className="text-sm text-gray-500">{item.date} • {item.time}</div>
                </div>
                <div className="text-green-600 text-sm font-medium">Hoàn thành</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
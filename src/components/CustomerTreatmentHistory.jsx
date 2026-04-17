import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function CustomerTreatmentHistory({ user }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('photo_sessions')
        .select(`
          *,
          packages(name, emoji)
        `)
        .eq('cust_id', user.id)
        .order('date', { ascending: false });
      setSessions(data || []);
    };
    load();
  }, [user.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📋 Lịch sử buổi trị liệu</h2>
      {sessions.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-4">📷</div>
          Chưa có buổi trị liệu nào
        </div>
      ) : (
        <div className="space-y-6">
          {sessions.map(s => (
            <div key={s.id} className="bg-white rounded-3xl p-6 shadow">
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{s.packages?.emoji}</span>
                  <div className="font-semibold">{s.packages?.name}</div>
                </div>
                <div className="text-xs text-gray-400">{s.date}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {s.before_img && <img src={s.before_img} className="rounded-2xl" alt="Trước" />}
                {s.after_img && <img src={s.after_img} className="rounded-2xl" alt="Sau" />}
              </div>
              {s.note && <div className="mt-4 text-sm bg-[#faf5ff] p-4 rounded-2xl">{s.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerTreatmentHistory;
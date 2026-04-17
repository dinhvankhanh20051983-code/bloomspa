import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function CustAppts({ user }) {
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('appointments')
        .select(`
          *,
          packages(name, emoji)
        `)
        .eq('cust_id', user.id)
        .order('date', { ascending: false });
      setAppts(data || []);
    };
    load();
  }, [user.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">📅 Lịch hẹn của tôi</h2>
      <div className="space-y-4">
        {appts.map(apt => (
          <div key={apt.id} className="bg-white rounded-3xl p-6 shadow">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{apt.packages?.emoji}</span>
              <div className="flex-1">
                <div className="font-semibold">{apt.packages?.name}</div>
                <div className="text-sm text-gray-500">{apt.date} • {apt.time}</div>
              </div>
              <span className="text-xs px-4 py-2 bg-green-100 text-green-700 rounded-3xl">{apt.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustAppts;

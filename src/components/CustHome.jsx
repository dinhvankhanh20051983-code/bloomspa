import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function CustHome({ user }) {
  const [upcoming, setUpcoming] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('appointments')
        .select(`
          *,
          packages(name, emoji)
        `)
        .eq('cust_id', user.id)
        .eq('status', 'confirmed')
        .limit(1);
      setUpcoming(data?.[0] || null);
    };
    load();
  }, [user.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Xin chào, {user.name} 👋</h2>

      {upcoming && (
        <div className="bg-white rounded-3xl p-6 shadow mb-8">
          <div className="text-sm text-gray-500">Lịch hẹn sắp tới</div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-4xl">{upcoming.packages?.emoji}</span>
            <div>
              <div className="font-semibold">{upcoming.packages?.name}</div>
              <div className="text-sm">{upcoming.date} • {upcoming.time}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 text-center cursor-pointer" onClick={() => window.location.hash = '#appts'}>
          📅 Đặt lịch
        </div>
        <div className="bg-white rounded-3xl p-6 text-center cursor-pointer" onClick={() => window.location.hash = '#shop'}>
          🛒 Cửa hàng
        </div>
      </div>
    </div>
  );
}

export default CustHome;
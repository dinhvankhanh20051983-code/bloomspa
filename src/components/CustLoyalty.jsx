import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function CustLoyalty({ user }) {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data: pt } = await supabase
        .from('loyalty_points')
        .select('total_points')
        .eq('customer_id', user.id)
        .single();
      setPoints(pt?.total_points || 0);

      const { data: hist } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('customer_id', user.id)
        .order('date', { ascending: false });
      setHistory(hist || []);
    };
    load();
  }, [user.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🎟️ Điểm Loyalty của tôi</h2>
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-3xl p-8 text-center mb-8">
        <div className="text-sm opacity-90">Tổng điểm hiện tại</div>
        <div className="text-7xl font-bold my-3">{points.toLocaleString()}</div>
        <div className="text-sm opacity-75">Có thể đổi quà / giảm giá</div>
      </div>
      <div className="bg-white rounded-3xl p-6 shadow">
        <h3 className="font-semibold mb-4">📜 Lịch sử điểm</h3>
        {history.length === 0 ? (
          <p className="text-gray-400 py-8 text-center">Chưa có giao dịch điểm</p>
        ) : (
          history.map(t => (
            <div key={t.id} className="flex justify-between py-4 border-b">
              <div>
                <div className="font-medium">{t.reason}</div>
                <div className="text-xs text-gray-400">{new Date(t.date).toLocaleDateString('vi-VN')}</div>
              </div>
              <div className={`font-bold ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {t.amount > 0 ? '+' : ''}{t.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CustLoyalty;
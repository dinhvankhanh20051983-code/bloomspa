import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

function OwnerDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    customers: 0,
    appointments: 0,
    todayAppts: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      // Doanh thu hôm nay
      const { data: tx } = await supabase.from('finance_transactions').select('amount').gte('date', new Date().toISOString().split('T')[0]);
      const revenue = tx ? tx.reduce((sum, t) => sum + t.amount, 0) : 0;

      // Số khách
      const { count: custCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });
      // Số lịch hẹn hôm nay
      const today = new Date().toISOString().split('T')[0];
      const { count: apptCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('date', today);

      setStats({
        revenue,
        customers: custCount || 0,
        appointments: 12,
        todayAppts: apptCount || 0
      });
    };
    loadStats();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🌸 Dashboard Chủ Tiệm</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#7c5cbf] to-[#5a3d9e] text-white rounded-3xl p-6">
          <div className="text-sm opacity-75">Doanh thu hôm nay</div>
          <div className="text-4xl font-bold mt-2">{stats.revenue.toLocaleString('vi-VN')}đ</div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="text-sm text-gray-500">Khách hàng</div>
          <div className="text-4xl font-bold text-[#7c5cbf] mt-2">{stats.customers}</div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="text-sm text-gray-500">Lịch hẹn hôm nay</div>
          <div className="text-4xl font-bold text-[#7c5cbf] mt-2">{stats.todayAppts}</div>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow">
          <div className="text-sm text-gray-500">Tổng lịch hẹn</div>
          <div className="text-4xl font-bold text-[#7c5cbf] mt-2">{stats.appointments}</div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;